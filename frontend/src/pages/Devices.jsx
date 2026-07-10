import { Link } from 'react-router-dom'
import './Devices.css'

function Devices() {
  const devices = []

  return (
    <div className="devices-page">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Dispositivos</h2>
          <p className="page-subtitle">Gestiona y monitorea tus dispositivos de control de plagas</p>
        </div>
        <button className="btn-primary" disabled>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Agregar Dispositivo
        </button>
      </div>

      <div className="devices-card">
        {devices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#B0B0C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="11" x2="13" y2="11" />
              </svg>
            </div>
            <h3 className="empty-title">No se han registrado dispositivos</h3>
            <p className="empty-description">
              Aún no hay dispositivos conectados al sistema. Los dispositivos aparecerán aquí una vez que el backend esté configurado y se registren nuevos equipos.
            </p>
          </div>
        ) : (
          <div className="devices-table">
            <div className="table-header">
              <span className="col-name">Dispositivo</span>
              <span className="col-type">Tipo</span>
              <span className="col-location">Ubicación</span>
              <span className="col-status">Estado</span>
              <span className="col-actions"></span>
            </div>
            {devices.map((device) => (
              <Link to={`/dispositivos/${device.id}`} key={device.id} className="table-row">
                <span className="col-name">{device.name}</span>
                <span className="col-type">{device.type}</span>
                <span className="col-location">{device.location}</span>
                <span className="col-status">
                  <span className={`status-badge ${device.status}`}>{device.statusLabel}</span>
                </span>
                <span className="col-actions">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8EA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Devices
