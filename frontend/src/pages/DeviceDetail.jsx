import { useParams, Link } from 'react-router-dom'
import './DeviceDetail.css'

function DeviceDetail() {
  const { id } = useParams()

  return (
    <div className="detail-page">
      <div className="detail-header">
        <Link to="/dispositivos" className="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Volver a Dispositivos
        </Link>
        <h2 className="detail-title">Detalle de captura</h2>
      </div>

      <div className="detail-content">
        <div className="capture-card">
          <div className="capture-card-header">
            <div className="capture-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E94560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className="capture-info">
              <h3 className="capture-name">Trampa A3 — Captura detectada</h3>
              <p className="capture-location">Biblioteca ID MEC, norte</p>
            </div>
            <span className="capture-status">No revisada</span>
          </div>

          <div className="capture-pest">
            <span className="pest-label">Ratón</span>
          </div>
        </div>

        <div className="event-card">
          <h3 className="event-section-title">Información del evento</h3>

          <div className="event-fields">
            <div className="event-field">
              <span className="field-label">Dispositivo</span>
              <span className="field-value">Trampa A67 (ID 001)</span>
            </div>
            <div className="event-field">
              <span className="field-label">Tipo</span>
              <span className="field-value">Trampa para ratones</span>
            </div>
            <div className="event-field">
              <span className="field-label">Ubicación</span>
              <span className="field-value">Biblioteca ID MEC</span>
            </div>
            <div className="event-field">
              <span className="field-label">Detectado</span>
              <span className="field-value">9:29 AM · 12 jun 2026</span>
            </div>
            <div className="event-field">
              <span className="field-label">Última revisión</span>
              <span className="field-value">Hace 3 días</span>
            </div>
          </div>
        </div>

        <button className="btn-mark-revised">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Marcar como revisada
        </button>
      </div>

      <div className="detail-empty-notice">
        <p>
          Dispositivo <strong>#{id}</strong> — Los datos se cargarán automáticamente cuando el backend esté disponible.
        </p>
      </div>
    </div>
  )
}

export default DeviceDetail
