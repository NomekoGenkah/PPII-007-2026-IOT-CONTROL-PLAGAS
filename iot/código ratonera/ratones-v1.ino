#include <WiFi.h>
#include <PubSubClient.h>

/*Proyecto ratones*/


// CONFIGURACIÓN WIFI
//////////////////////////////////////////////////////////

const char* ssid = "WIFINAME";
const char* password = "PASSWORD";


// CONFIGURACIÓN THINGSBOARD
//////////////////////////////////////////////////////////

const char* mqtt_server = "mqtt.thingsboard.cloud";         //BROKER GRATUITO CAMBIAR A HIVEMQ PARA OCUPAR SU API
const int mqtt_port = 1883;

// Access Token del dispositivo
const char* accessToken = "gkHYttbO2uS9oDVQ7dkk";         //token de broker gratuito

WiFiClient espClient;
PubSubClient client(espClient);


// SENSOR IR FC-51
//////////////////////////////////////////////////////////

const int sensorPin = 4;

int contador = 0;
bool objetoDetectado = false;

//////////////////////////////////////////////////////////

void conectarWiFi() {

  if (WiFi.status() == WL_CONNECTED)
    return;

  Serial.print("Conectando a WiFi");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi conectado");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

//////////////////////////////////////////////////////////

void conectarMQTT() {

  while (!client.connected()) {

    Serial.print("Conectando a ThingsBoard... ");

    if (client.connect("ESP32_MouseCounter", accessToken, "")) {

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
           "\"sensor\":\"FC-51\""
           "}",
           contador,
           millis(),
           WiFi.RSSI());

  Serial.print("Enviando: ");
  Serial.println(payload);

  client.publish("v1/devices/me/telemetry", payload);

}

//////////////////////////////////////////////////////////

void setup() {

  Serial.begin(115200);

  pinMode(sensorPin, INPUT);

  conectarWiFi();

  client.setServer(mqtt_server, mqtt_port);

}

//////////////////////////////////////////////////////////

void loop() {

  if (WiFi.status() != WL_CONNECTED)
    conectarWiFi();

  if (!client.connected())
    conectarMQTT();

  client.loop();

  bool estadoSensor = digitalRead(sensorPin);

  // FC-51 normalmente entrega LOW cuando detecta
  if (estadoSensor == LOW && !objetoDetectado) {

    objetoDetectado = true;

    contador++;

    Serial.println("--------------------------------");
    Serial.print("Objeto detectado");
    Serial.print(" | Contador: ");
    Serial.println(contador);

    publicarContador();

  }

  // Cuando el objeto deja de detectarse
  if (estadoSensor == HIGH) {

    objetoDetectado = false;

  }

  delay(20);

}