import { useState } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="header-content">
              <path d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M20 14C16.6863 14 14 16.6863 14 20C14 23.3137 16.6863 26 20 26" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="20" r="3" fill="white" />
        </div>
      </div>

      <div className="login-body">
        <div className="login-card">
          <h1 className="principaltitle">
            <span className="principaltitle-pests">ULSPests</span>
            <span className="principaltitle-control">Control</span>
          </h1>
          <p className="principalptitle-subtitle">Monitorio de Plagas</p>

          <p className="login-title">Iniciar Sesión</p>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4C6.5 4 3.5 6 2 9C3.5 12 6.5 14 10 14C13.5 14 16.5 12 18 9C16.5 6 13.5 4 10 4Z" stroke="#8E8EA0" strokeWidth="1.5" />
                      <circle cx="10" cy="9" r="2.5" fill="#8E8EA0" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4C6.5 4 3.5 6 2 9C3.5 12 6.5 14 10 14C13.5 14 16.5 12 18 9C16.5 6 13.5 4 10 4Z" stroke="#8E8EA0" strokeWidth="1.5" />
                      <circle cx="10" cy="9" r="2.5" fill="#8E8EA0" />
                      <line x1="3" y1="3" x2="17" y2="17" stroke="#8E8EA0" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button">
              <span>Iniciar Sesión</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>

        <p className="register-link">
          ¿No tienes cuenta? <a href="#">Registrarse</a>
        </p>
      </div>
    </div>
  )
}

export default Login
