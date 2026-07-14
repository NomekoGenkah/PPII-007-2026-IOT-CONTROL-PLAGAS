#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

/* Proyecto ratones */

// CONFIGURACIÓN WIFI
//////////////////////////////////////////////////////////
const char* ssid = "fh_87a050";
const char* password = "wlan785faf";

// CONFIGURACIÓN HIVEMQ
//////////////////////////////////////////////////////////
const char* mqtt_server = "611c9a631df34f7891d695cf4187e5ce.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;

// Nuevas credenciales
const char* mqtt_user = "esp32";
const char* mqtt_password = "equipoeco";

// Identificador único de esta ratonera (cambiar a "02", "03", etc. en otros ESP32)
const char* sensor_slug = "01";   

WiFiClientSecure espClient;
PubSubClient client(espClient);

// SENSOR IR FC-51
//////////////////////////////////////////////////////////
const int sensorPin = 4;
int contador = 0;
bool objetoDetectado = false;
String clientId = ""; // Se llenará con la MAC automáticamente NO TOCAR

//////////////////////////////////////////////////////////

void conectarWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;
  Serial.print("Conectando a WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado. IP: ");
  Serial.println(WiFi.localIP());
}

//////////////////////////////////////////////////////////

void conectarMQTT() {
  // Generar un ID único usando la dirección MAC si está vacío
  if (clientId == "") {
    clientId = "Ratonera_" + WiFi.macAddress();
    clientId.replace(":", ""); // Limpiar los dos puntos
  }

  while (!client.connected()) {
    Serial.print("Conectando a HiveMQ Cloud como ");
    Serial.print(clientId);
    Serial.print("... ");

    // Conectar usando el ID único
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
      Serial.println("OK");
    } else {
      Serial.print("Error MQTT: ");
      Serial.println(client.state());
      Serial.println("Reintentando en 5 segundos...");
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
           contador, millis(), WiFi.RSSI(), sensor_slug);

  Serial.print("Enviando: ");
  Serial.println(payload);

  // Nuevo Topic dinámico basado en el slug (ej. ratones/01/status)
  char topic[64];
  snprintf(topic, sizeof(topic), "ratones/%s/status", sensor_slug);
  client.publish(topic, payload);
}

//////////////////////////////////////////////////////////

void setup() {
  Serial.begin(115200);
  pinMode(sensorPin, INPUT);
  
  conectarWiFi();
  
  espClient.setInsecure();
  client.setServer(mqtt_server, mqtt_port);
}

//////////////////////////////////////////////////////////

void loop() {
  if (WiFi.status() != WL_CONNECTED) conectarWiFi();
  if (!client.connected()) conectarMQTT();
  client.loop();

  bool estadoSensor = digitalRead(sensorPin);

  // FC-51 normalmente entrega LOW cuando detecta
  if (estadoSensor == LOW && !objetoDetectado) {
    objetoDetectado = true;
    contador++;

    Serial.println("--------------------------------");
    Serial.print("Objeto detectado | Contador: ");
    Serial.println(contador);

    publicarContador();
  }

  // Cuando el objeto deja de detectarse
  if (estadoSensor == HIGH) {
    objetoDetectado = false;
  }

  delay(20);
}