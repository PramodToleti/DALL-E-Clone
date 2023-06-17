import React, { useEffect } from "react"

import "./index.css"

const LoginPage = () => {
  useEffect(() => {
    document.getElementsByTagName("nav")[0].style.display = "none"
    document.querySelector(".mobile-navbar").style.display = "none"
  }, [])

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            required
          />
          <br />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            required
          />
          <button className="login-btn">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
