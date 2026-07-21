#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <Preferences.h>

/* Proyecto Ratoneras IoT - Memoria Flash y Control Remoto */

// CONFIGURACIÓN WIFI
//////////////////////////////////////////////////////////
const char* ssid = "fh_87a050";
const char* password = "wlan785faf";

// CONFIGURACIÓN HIVEMQ
//////////////////////////////////////////////////////////
const char* mqtt_server = "611c9a631df34f7891d695cf4187e5ce.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* mqtt_user = "esp32";
const char* mqtt_password = "equipoeco";

WiFiClientSecure espClient;
PubSubClient client(espClient);
Preferences preferencias;

// VARIABLES GLOBALES
//////////////////////////////////////////////////////////
const int sensorPin = 4;
int contador = 0;
bool objetoDetectado = false;
String clientId = "";
String sensor_slug = ""; // Ahora es dinámico y se lee de la memoria

//////////////////////////////////////////////////////////
// DECLARACIÓN DE FUNCIONES
void conectarWiFi();
void conectarMQTT();
void publicarContador();
void callback(char* topic, byte* payload, unsigned int length);

//////////////////////////////////////////////////////////

void setup() {
  Serial.begin(115200);
  pinMode(sensorPin, INPUT);

  // 1. Inicializar Memoria Flash
  preferencias.begin("ratonera", false);
  
  // Leer valores guardados (si no existen, usa valores por defecto)
  contador = preferencias.getInt("contador", 0);
  sensor_slug = preferencias.getString("slug", "01"); // "01" por defecto
  
  Serial.println("\n--- INICIANDO SISTEMA ---");
  Serial.print("ID Sensor actual: ");
  Serial.println(sensor_slug);
  Serial.print("Contador recuperado: ");
  Serial.println(contador);

  // 2. Conexiones
  conectarWiFi();
  
  espClient.setInsecure();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback); // Asignar la función que escucha comandos
}

//////////////////////////////////////////////////////////

void loop() {
  if (WiFi.status() != WL_CONNECTED) conectarWiFi();
  if (!client.connected()) conectarMQTT();
  client.loop();

  bool estadoSensor = digitalRead(sensorPin);

  // Detección del objeto (Lógica con retención de estado)
  if (estadoSensor == LOW && !objetoDetectado) {
    objetoDetectado = true;
    contador++;

    // Guardar inmediatamente en memoria no volátil
    preferencias.putInt("contador", contador);

    Serial.println("--------------------------------");
    Serial.print("🐀 Objeto detectado | Contador: ");
    Serial.println(contador);

    publicarContador();
  }

  if (estadoSensor == HIGH) {
    objetoDetectado = false;
  }

  delay(20);
}

//////////////////////////////////////////////////////////

void callback(char* topic, byte* payload, unsigned int length) {
  String mensaje = "";
  for (int i = 0; i < length; i++) {
    mensaje += (char)payload[i];
  }
  
  Serial.println("\n--------------------------------");
  Serial.print("📥 Comando recibido: ");
  Serial.println(mensaje);

  // COMANDO: RESET
  if (mensaje == "RESET") {
    contador = 0;
    preferencias.putInt("contador", 0);
    Serial.println("🔄 Contador reiniciado a 0 remotamente.");
    publicarContador();
  }
  // COMANDO: PING
  else if (mensaje == "PING") {
    Serial.println("🏓 Ping recibido. Enviando estado actual...");
    publicarContador();
  }
  // COMANDO: RENAME (Ejemplo de uso -> RENAME:02)
  else if (mensaje.startsWith("RENAME:")) {
    String nuevoSlug = mensaje.substring(7);
    nuevoSlug.trim();
    
    if (nuevoSlug.length() > 0) {
      Serial.print("🏷️ Renombrando sensor a: ");
      Serial.println(nuevoSlug);
      
      preferencias.putString("slug", nuevoSlug);
      Serial.println("Reiniciando ESP32 para aplicar cambios...");
      delay(1000);
      ESP.restart(); // Reinicia la placa para limpiar variables y reconectar MQTT
    }
  }
  else {
    Serial.println("⚠️ Comando desconocido.");
  }
}

//////////////////////////////////////////////////////////

void conectarWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;
  Serial.print("Conectando a WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado.");
}

//////////////////////////////////////////////////////////

void conectarMQTT() {
  if (clientId == "") {
    clientId = "Ratonera_" + WiFi.macAddress();
    clientId.replace(":", "");
  }

  while (!client.connected()) {
    Serial.print("Conectando a MQTT como ");
    Serial.print(clientId);
    Serial.print("... ");

    if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
      Serial.println("OK");
      
      // Suscribirse al topic de control dinámico
      String topicControl = "ratones/" + sensor_slug + "/control";
      client.subscribe(topicControl.c_str());
      
      Serial.print("Suscrito a control: ");
      Serial.println(topicControl);
      
      // Enviar un reporte inicial al conectarse
      publicarContador();
      
    } else {
      Serial.print("Error: ");
      Serial.println(client.state());
      delay(5000);
    }
  }
}

//////////////////////////////////////////////////////////

void publicarContador() {
  char payload[256];
  snprintf(payload, sizeof(payload),
           "{"
           "\"contador\": %d,"
           "\"uptime\": %lu,"
           "\"wifi\": %d,"
           "\"sensor\":\"FC-51\","
           "\"sensor_slug\":\"%s\""
           "}",
           contador, millis(), WiFi.RSSI(), sensor_slug.c_str());

  String topicStatus = "ratones/" + sensor_slug + "/status";
  
  Serial.print("Enviando a ");
  Serial.print(topicStatus);
  Serial.print(" -> ");
  Serial.println(payload);
  
  client.publish(topicStatus.c_str(), payload);
}