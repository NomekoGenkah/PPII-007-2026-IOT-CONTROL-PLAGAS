import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Devices from './pages/Devices'
import DeviceDetail from './pages/DeviceDetail'

function Placeholder({ title }) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2 style={{ color: '#1A1A2E', marginBottom: '8px' }}>{title}</h2>
      <p style={{ color: '#8E8EA0', fontSize: '14px' }}>Próximamente</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Placeholder title="Inicio" />} />
          <Route path="/mapa" element={<Placeholder title="Mapa" />} />
          <Route path="/dispositivos" element={<Devices />} />
          <Route path="/dispositivos/:id" element={<DeviceDetail />} />
          <Route path="/estadisticas" element={<Placeholder title="Estadísticas" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
