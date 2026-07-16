import os
import tkinter as tk
from tkinter import messagebox
import paho.mqtt.client as mqtt
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# --- CONFIGURACIÓN MQTT ---
MQTT_BROKER = os.getenv("MQTT_BROKER")
MQTT_PORT = int(os.getenv("MQTT_PORT", 8883))
MQTT_USER = os.getenv("MQTT_USER_CONTROL")
MQTT_PASSWORD = os.getenv("MQTT_PASSWORD")

def enviar_comando(comando):
    target = entry_target.get().strip()
    if not target:
        messagebox.showwarning("Advertencia", "Por favor ingresa el ID de la ratonera (ej: 01)")
        return
    
    topic = f"ratones/{target}/control"
    
    # Preparamos el payload en caso de que sea el comando RENAME
    if comando == "RENAME":
        nuevo_nombre = entry_rename.get().strip()
        if not nuevo_nombre:
            messagebox.showwarning("Advertencia", "Ingresa el nuevo ID para renombrar")
            return
        payload = f"RENAME:{nuevo_nombre}"
    else:
        payload = comando

    # Conectar y enviar (conexión rápida para GUI)
    try:
        try:
            from paho.mqtt.enums import CallbackAPIVersion
            client = mqtt.Client(callback_api_version=CallbackAPIVersion.VERSION2, client_id="Python_GUI")
        except ImportError:
            client = mqtt.Client(client_id="Python_GUI")

        client.tls_set()
        client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
        
        lbl_status.config(text="Conectando al broker...", fg="blue")
        root.update()
        
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        client.loop_start()
        
        info = client.publish(topic, payload, qos=1)
        info.wait_for_publish()
        
        client.loop_stop()
        client.disconnect()
        
        lbl_status.config(text=f" Enviado: {payload} -> {topic}", fg="green")
        
    except Exception as e:
        lbl_status.config(text=f" Error de conexión", fg="red")
        messagebox.showerror("Error", f"Fallo al enviar comando:\n{e}")

# --- INTERFAZ GRÁFICA (GUI) ---
root = tk.Tk()
root.title("Panel de Control - Ratoneras IoT")
root.geometry("400x350")
root.configure(padx=20, pady=20)

# Título
tk.Label(root, text="Control Remoto MQTT", font=("Arial", 14, "bold")).pack(pady=(0, 15))

# Input del Target (A quién le hablamos)
frame_target = tk.Frame(root)
frame_target.pack(fill="x", pady=5)
tk.Label(frame_target, text="ID de Ratonera Destino (ej: 01):").pack(side="left")
entry_target = tk.Entry(frame_target, width=10, font=("Arial", 12))
entry_target.insert(0, "01")
entry_target.pack(side="right")

tk.Frame(root, height=2, bd=1, relief="sunken").pack(fill="x", pady=15)

# Botón PING
tk.Button(root, text=" PING (Solicitar Estado)", bg="#e0e0e0", 
          command=lambda: enviar_comando("PING")).pack(fill="x", pady=5)

# Botón RESET
tk.Button(root, text=" RESET (Poner contador en 0)", bg="#ffcccc", 
          command=lambda: enviar_comando("RESET")).pack(fill="x", pady=5)

tk.Frame(root, height=2, bd=1, relief="sunken").pack(fill="x", pady=15)

# Sección RENAME
frame_rename = tk.Frame(root)
frame_rename.pack(fill="x", pady=5)
tk.Label(frame_rename, text="Nuevo ID:").pack(side="left")
entry_rename = tk.Entry(frame_rename, width=10, font=("Arial", 12))
entry_rename.pack(side="left", padx=10)
tk.Button(frame_rename, text="RENAME", bg="#cce5ff", 
          command=lambda: enviar_comando("RENAME")).pack(side="right")

# Label de estado/log
lbl_status = tk.Label(root, text="Esperando instrucciones...", font=("Arial", 9), fg="gray")
lbl_status.pack(side="bottom", pady=10)

root.mainloop()