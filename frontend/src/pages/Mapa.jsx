import './Mapa.css'

const LEGEND = [
  { label: 'Trampa', color: '#C62828' },
  { label: 'Disuasor', color: '#002D72' },
  { label: 'Activo', color: '#2E7D32' },
  { label: 'Advertencia', color: '#E65100' },
]

const SUMMARY = [
  { label: 'Capturas', value: '--' },
  { label: 'Disuasiones', value: '--' },
  { label: 'Activos', value: '--' },
  { label: 'Focos', value: '--' },
]

function Mapa() {
  return (
    <div className="mapa-page">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Mapa de dispositivos</h2>
          <p className="page-subtitle">Visualización geográfica de trampas y dispositivos en campus</p>
        </div>
      </div>

      <div className="mapa-main-grid">
        <div className="mapa-map-card">
          <div className="mapa-map-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#B0B0C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <p className="mapa-empty-title">Mapa no disponible</p>
            <p className="mapa-empty-desc">
              La visualización del mapa se mostrará una vez que se integre el backend y se configuren las ubicaciones de los campus.
            </p>
          </div>
        </div>

        <div className="mapa-sidebar">
          <div className="mapa-legend-card">
            <h4 className="mapa-legend-title">Leyenda</h4>
            <div className="mapa-legend-list">
              {LEGEND.map((item) => (
                <div className="mapa-legend-item" key={item.label}>
                  <span className="mapa-legend-dot" style={{ background: item.color }} />
                  <span className="mapa-legend-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mapa-devices-card">
            <h4 className="mapa-devices-title">Dispositivos en Campus</h4>
            <div className="mapa-devices-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B0B0C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <p className="mapa-devices-empty-title">Sin registros</p>
              <p className="mapa-devices-empty-desc">
                No hay dispositivos registrados en campus. Esta sección se actualizará cuando el backend esté disponible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mapa-summary-row">
        {SUMMARY.map((item) => (
          <div className="mapa-summary-card" key={item.label}>
            <span className="mapa-summary-value">{item.value}</span>
            <span className="mapa-summary-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mapa
