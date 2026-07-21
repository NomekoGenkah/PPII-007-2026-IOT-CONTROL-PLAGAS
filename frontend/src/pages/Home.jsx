import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Inicio</h2>
          <p className="page-subtitle">Resumen general del sistema de control de plagas</p>
        </div>
      </div>

      <div className="home-summary-grid">
        <div className="home-stat-card">
          <div className="home-stat-icon home-stat-icon--blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#002D72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="home-stat-value">--</span>
          <span className="home-stat-label">Capturas esta semana</span>
        </div>

        <div className="home-stat-card">
          <div className="home-stat-icon home-stat-icon--green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <span className="home-stat-value">--</span>
          <span className="home-stat-label">Disuasiones hoy</span>
        </div>

        <div className="home-stat-card">
          <div className="home-stat-icon home-stat-icon--orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <span className="home-stat-value">--</span>
          <span className="home-stat-label">Dispositivos activos</span>
        </div>

        <div className="home-stat-card">
          <div className="home-stat-icon home-stat-icon--red">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <span className="home-stat-value">--</span>
          <span className="home-stat-label">Focos de plaga</span>
        </div>
      </div>

      <div className="home-section-row">
        <div className="home-card">
          <div className="home-card-header">
            <h3 className="home-card-title">Alertas recientes</h3>
            <Link to="/dispositivos" className="home-card-link">Gestionar →</Link>
          </div>
          <div className="home-card-body home-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B0B0C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <p className="home-empty-title">No hay alertas registradas</p>
            <p className="home-empty-desc">
              Las alertas de dispositivos aparecerán aquí cuando el backend esté disponible.
            </p>
          </div>
        </div>

        <div className="home-card">
          <div className="home-card-header">
            <h3 className="home-card-title">Dispositivos</h3>
            <Link to="/dispositivos" className="home-card-link">Gestionar →</Link>
          </div>
          <div className="home-card-body home-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B0B0C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <p className="home-empty-title">No se han registrado dispositivos</p>
            <p className="home-empty-desc">
              Los dispositivos aparecerán aquí una vez que el backend esté configurado y se registren nuevos equipos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
