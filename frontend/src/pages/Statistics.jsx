import { useState } from 'react'
import './Statistics.css'

const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const MOCK_DAY_DATA = [
  [0, 0, 1, 2, 3, 1, 0, 2, 4, 3, 1, 0, 0, 1, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 4, 3, 1, 0, 2, 3, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 2, 3, 2, 1, 0, 1, 3, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 2, 4, 3, 1, 0, 1, 2, 3, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 2, 3, 2, 1, 0, 1, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
]

const MOCK_WEEK_DATA = [
  [3, 2, 4, 1, 3, 2, 1],
  [2, 1, 3, 2, 4, 1, 0],
  [4, 3, 2, 3, 1, 2, 1],
  [1, 2, 1, 4, 2, 3, 2],
  [2, 1, 3, 2, 1, 4, 1],
]

function sumColumns(matrix) {
  if (matrix.length === 0) return []
  return matrix[0].map((_, colIdx) => matrix.reduce((sum, row) => sum + row[colIdx], 0))
}

function Statistics() {
  const [range, setRange] = useState('dia')
  const isDay = range === 'dia'
  const xLabels = isDay ? HOURS : DAYS
  const totals = sumColumns(isDay ? MOCK_DAY_DATA : MOCK_WEEK_DATA)
  const maxVal = Math.max(...totals)

  return (
    <div className="stats-page">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Estadísticas</h2>
          <p className="page-subtitle">Análisis del rendimiento y actividad del sistema</p>
        </div>
      </div>

      <div className="stats-range-selector">
        <button
          className={`range-pill ${range === 'dia' ? 'active' : ''}`}
          onClick={() => setRange('dia')}
        >
          Día
        </button>
        <button
          className={`range-pill ${range === 'semana' ? 'active' : ''}`}
          onClick={() => setRange('semana')}
        >
          Semana
        </button>
      </div>

      <div className="stats-summary-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon--blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#002D72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <span className="stat-value">--</span>
          <span className="stat-label">Dispositivos Activos</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <span className="stat-value">--</span>
          <span className="stat-label">Registros Totales</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <span className="stat-value">--</span>
          <span className="stat-label">Promedio por Dispositivo</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--red">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <span className="stat-value">--</span>
          <span className="stat-label">Alertas Activas</span>
        </div>
      </div>

      <div className="stats-card">
        <h3 className="stats-card-title">Registros por {isDay ? 'horas' : 'días'}</h3>
        <div className="barchart-wrapper">
          <div className="barchart-x-labels">
            {xLabels.map((label) => (
              <span key={label} className="barchart-x-label">{label}</span>
            ))}
          </div>
          <div className="barchart-body">
            <div className="barchart-bars">
              {totals.map((val, colIdx) => (
                <div className="barchart-bar-slot" key={colIdx}>
                  <div
                    className="barchart-bar"
                    style={{ height: `${maxVal > 0 ? (val / maxVal) * 100 : 0}%` }}
                    title={`${xLabels[colIdx]}: ${val}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chart-no-data">
          <p>Los datos reales se mostrarán cuando el backend esté disponible.</p>
        </div>
      </div>
    </div>
  )
}

export default Statistics
