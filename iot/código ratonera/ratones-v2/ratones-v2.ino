#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <Preferences.h>
#include <LittleFS.h>

/* Proyecto Ratoneras IoT - Memoria Flash, Cola Offline y Control Remoto */

// CONFIGURACIÓN WIFI
//////////////////////////////////////////////////////////
const char* ssid = "Honor-Magic-7-Lite-Toñito";
const char* password = "Guatona1";

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
String sensor_slug = ""; 
unsigned long ultimoIntentoConexion = 0; // Temporizador para reconexión no bloqueante

//////////////////////////////////////////////////////////
// DECLARACIÓN DE FUNCIONES
void gestionarConexion();
void publicarContador();
void encolarPayload(String payload);
void procesarColaPendiente();
void callback(char* topic, byte* payload, unsigned int length);

//////////////////////////////////////////////////////////

void setup() {
  Serial.begin(115200);
  pinMode(sensorPin, INPUT);

  // 1. Inicializar Memorias
  preferencias.begin("ratonera", false);
  
  if (!LittleFS.begin(true)) {
    Serial.println("Error montando sistema de archivos LittleFS");
  }
  
  // Leer valores guardados
  contador = preferencias.getInt("contador", 0);
  sensor_slug = preferencias.getString("slug", "01"); 
  
  Serial.println("\n--- INICIANDO SISTEMA ---");
  Serial.print("ID Sensor actual: ");
  Serial.println(sensor_slug);
  Serial.print("Contador recuperado: ");
  Serial.println(contador);

  // 2. Configurar Conexiones
  espClient.setInsecure();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  WiFi.begin(ssid, password); // Iniciar intento de conexión WiFi en segundo plano
}

//////////////////////////////////////////////////////////

void loop() {
  // Gestión de reconexión "No Bloqueante" (intenta cada 5 segundos si falla algo)
  if (WiFi.status() != WL_CONNECTED || !client.connected()) {
    if (millis() - ultimoIntentoConexion > 5000) {
      ultimoIntentoConexion = millis();
      gestionarConexion();
    }
  } else {
    client.loop(); // Solo escuchamos MQTT si hay conexión
  }

  // Lectura del sensor
  bool estadoSensor = digitalRead(sensorPin);

  if (estadoSensor == LOW && !objetoDetectado) {
    objetoDetectado = true;
    contador++;

    // Guardar estado base en NVS
    preferencias.putInt("contador", contador);

    Serial.println("--------------------------------");
    Serial.print("Objeto detectado | Contador: ");
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
  Serial.print("Comando recibido: ");
  Serial.println(mensaje);

  if (mensaje == "RESET") {
    contador = 0;
    preferencias.putInt("contador", 0);
    Serial.println("Contador reiniciado a 0 remotamente.");
    publicarContador();
  }
  else if (mensaje == "PING") {
    Serial.println("Ping recibido. Enviando estado actual...");
    publicarContador();
  }
  else if (mensaje.startsWith("RENAME:")) {
    String nuevoSlug = mensaje.substring(7);
    nuevoSlug.trim();
    
    if (nuevoSlug.length() > 0) {
      Serial.print("Renombrando sensor a: ");
      Serial.println(nuevoSlug);
      
      preferencias.putString("slug", nuevoSlug);
      Serial.println("Reiniciando ESP32 para aplicar cambios...");
      delay(1000);
      ESP.restart(); 
    }
  }
  else {
    Serial.println("Comando desconocido.");
  }
}

//////////////////////////////////////////////////////////

void gestionarConexion() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Esperando conexión WiFi...");
    return; // Salimos rápido para no bloquear el loop
  }

  if (!client.connected()) {
    if (clientId == "") {
      clientId = "Ratonera_" + WiFi.macAddress();
      clientId.replace(":", "");
    }

    Serial.print("Conectando a MQTT como ");
    Serial.print(clientId);
    Serial.print("... ");

    if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
      Serial.println("OK");
      
      String topicControl = "ratones/" + sensor_slug + "/control";
      client.subscribe(topicControl.c_str());
      
      Serial.print("Suscrito a control: ");
      Serial.println(topicControl);
      
      // 1. Procesar datos históricos guardados offline primero
      procesarColaPendiente();
      
      // 2. Estado actual comentado para evitar registros duplicados al reconectar
      // publicarContador();
      
    } else {
      Serial.print("Error MQTT: ");
      Serial.println(client.state());
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
  
  if (client.connected()) {
    Serial.print("Enviando a ");
    Serial.print(topicStatus);
    Serial.print(" -> ");
    Serial.println(payload);
    client.publish(topicStatus.c_str(), payload);
  } else {
    Serial.println("Desconectado de MQTT. Encolando registro...");
    encolarPayload(String(payload));
  }
}

//////////////////////////////////////////////////////////

void encolarPayload(String payload) {
  File file = LittleFS.open("/cola_mqtt.jsonl", FILE_APPEND);
  if (!file) {
    Serial.println("Error al abrir archivo para encolar");
    return;
  }
  file.println(payload);
  file.close();
  Serial.println("Payload guardado en la flash para envío posterior.");
}

//////////////////////////////////////////////////////////

void procesarColaPendiente() {
  if (!client.connected()) return;
  
  File file = LittleFS.open("/cola_mqtt.jsonl", FILE_READ);
  if (!file || file.size() == 0) {
    if (file) file.close();
    return; // No hay nada pendiente
  }

  Serial.println("Procesando registros almacenados offline...");
  
  while (file.available()) {
    String payload = file.readStringUntil('\n');
    payload.trim(); 
    
    if (payload.length() > 0) {
      String topicStatus = "ratones/" + sensor_slug + "/status";
      
      if (client.publish(topicStatus.c_str(), payload.c_str())) {
        Serial.println("Enviado desde cola: " + payload);
        delay(50); // Pequeño delay para no saturar la red ni al broker
      } else {
        Serial.println("Error enviando registro de la cola. Abortando proceso.");
        file.close();
        return; // Detenemos el envío para reintentar en el futuro
      }
    }
  }
  
  file.close();
  LittleFS.remove("/cola_mqtt.jsonl");
  Serial.println("Cola offline vaciada exitosamente.");
}