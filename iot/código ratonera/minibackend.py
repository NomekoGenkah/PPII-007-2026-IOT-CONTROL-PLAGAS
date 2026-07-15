import os
import json
import time
import paho.mqtt.client as mqtt
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# ==========================================
# 1. CONFIGURACIÓN DE APIS Y CREDENCIALES
# ==========================================
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

MQTT_BROKER = os.getenv("MQTT_BROKER")
MQTT_PORT = int(os.getenv("MQTT_PORT", 8883))
MQTT_USER = os.getenv("MQTT_USER_MINIBACK")
MQTT_PASSWORD = os.getenv("MQTT_PASSWORD")
MQTT_TOPIC = "ratones/+/status"  # El '+' actúa como comodín para cualquier ID de ratonera

# Inicializar cliente de Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ==========================================
# 2. CALLBACKS DE MQTT
# ==========================================

def on_connect(client, userdata, flags, rc, properties=None):
    """Se ejecuta cuando el script se conecta exitosamente al broker MQTT."""
    if rc == 0:
        print("⚡ Conectado exitosamente al broker de HiveMQ.")
        # Nos suscribimos al topic usando el comodín
        client.subscribe(MQTT_TOPIC)
        print(f"📡 Escuchando mensajes en el topic: {MQTT_TOPIC}")
    else:
        print(f" Falló la conexión al broker MQTT. Código de retorno: {rc}")

def on_message(client, userdata, msg):
    """Se ejecuta cada vez que llega un nuevo mensaje desde el ESP32."""
    try:
        # Decodificar el payload JSON
        payload_raw = msg.payload.decode("utf-8")
        data = json.loads(payload_raw)
        
        print(f"\n📩 Mensaje recibido en [{msg.topic}]: {data}")

        # Mapear los datos que envía el ESP32 a las columnas exactas de SQL
        registro = {
            "sensor_id": data.get("sensor_slug"),  # ej: "01"
            "conteo": data.get("contador"),        # ej: 14
            "señal_wifi": data.get("wifi"),        # ej: -68
            "uptime_ms": data.get("uptime")        # ej: 3200500
        }

        # Validar que los datos mínimos existan antes de insertar
        if registro["sensor_id"] is not None and registro["conteo"] is not None:
            # Insertar en la tabla "registros_plagas" de Supabase
            response = supabase.table("registros_plagas").insert(registro).execute()
            print("💾 Datos guardados en Supabase correctamente.")
        else:
            print("⚠️ Advertencia: El payload no contiene los campos requeridos (sensor_slug o contador).")

    except json.JSONDecodeError:
        print("❌ Error: El mensaje recibido no es un JSON válido.")
    except Exception as e:
        print(f"❌ Error al procesar o insertar los datos: {e}")

def on_disconnect(client, userdata, rc, properties=None):
    """Se ejecuta si se pierde la conexión con el broker."""
    print("⚠️ Conexión perdida con el broker MQTT. Intentando reconectar automáticamente...")
    # El cliente paho-mqtt gestiona la reconexión automática por defecto,
    # pero este log ayuda a monitorear la salud del canal.

# ==========================================
# 3. INICIALIZACIÓN DEL CLIENTE
# ==========================================

# Intentar instanciar usando la API v2 (paho-mqtt >= 2.0.0)
try:
    from paho.mqtt.enums import CallbackAPIVersion
    client = mqtt.Client(
        callback_api_version=CallbackAPIVersion.VERSION2,
        client_id="Python_Backend_Consumer"
    )
except (ImportError, AttributeError):
    # Fallback para versiones antiguas de paho-mqtt (1.x)
    client = mqtt.Client(client_id="Python_Backend_Consumer")

# Configurar TLS obligatorio de HiveMQ Cloud (puerto 8883)
client.tls_set()

# Configurar credenciales del broker
client.username_pw_set(MQTT_USER, MQTT_PASSWORD)

# Asignar los callbacks
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

# Conectar al broker (keepalive de 60 segundos)
print("Iniciando servicio de escucha MQTT...")
client.connect(MQTT_BROKER, MQTT_PORT, keepalive=60)

# Mantener el script en un loop infinito escuchando eventos
client.loop_forever()