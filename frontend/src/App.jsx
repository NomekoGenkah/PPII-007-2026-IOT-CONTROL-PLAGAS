import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import Mapa from './pages/Mapa'
import Devices from './pages/Devices'
import DeviceDetail from './pages/DeviceDetail'
import Statistics from './pages/Statistics'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/dispositivos" element={<Devices />} />
          <Route path="/dispositivos/:id" element={<DeviceDetail />} />
          <Route path="/estadisticas" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
