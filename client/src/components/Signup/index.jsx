import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import "./index.css"

import logo from "../../assets/website.png"
import GoogleAuth from "../GoogleAuth"
import loginImages from "../../LoginImages"

const randomImage = loginImages[Math.floor(Math.random() * loginImages.length)]

const Loading = (className) => {
  return (
    <div className={`assets-loading-container ${className.className}`}>
      <div class="assets-loader"></div>
      <p>Igniting the imagination...</p>
    </div>
  )
}
const SignUp = () => {
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false)
      document.getElementsByTagName("nav")[0].style.display = "none"
      document.querySelector(".mobile-navbar").style.display = "none"
      document.getElementsByClassName(
        "login-image-container"
      )[0].style.backgroundImage = `url(${randomImage})`
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  useEffect(() => {}, [])

  const handleUserDetails = (e, type) => {
    if (type === "google") {
      setUserDetails(e)
      return
    }
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem("userDetails", JSON.stringify(userDetails))
    window.location.href = "/"
  }

  return (
    <>
      <Loading className={loading ? "loading" : "loaded"} />
      <motion.div
        className="login-container"
        initial={{ opacity: 0, x: -35 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
      >
        <div className="login-inner">
          <div className="login-form-container">
            <img src={logo} alt="logo" className="logo" />
            <h1>Create an account</h1>
            <p>Let's get started with your free trail.</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  required
                  onChange={(e) => handleUserDetails(e)}
                />
                <label htmlFor="name" className="label">
                  Name
                </label>
                <div className="underline"></div>
              </div>

              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  required
                  onChange={(e) => handleUserDetails(e)}
                />
                <label htmlFor="email" className="label">
                  Email
                </label>
                <div className="underline"></div>
              </div>

              <div className="input-container">
                <input
                  type="password"
                  id="password"
                  required
                  onChange={(e) => handleUserDetails(e)}
                />
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="underline"></div>
              </div>

              <button type="submit" className="login-btn">
                Create account
              </button>

              {
                <GoogleAuth
                  handleUserDetails={handleUserDetails}
                  text={"signup_with"}
                />
              }
            </form>

            <p className="already-text">
              Already have an account?{" "}
              <Link to="/login" className="login-text">
                <span className="login-text">Log in</span>
              </Link>
            </p>
          </div>
          <div className="login-image-container"></div>
        </div>
      </motion.div>
    </>
  )
}

export default SignUp
