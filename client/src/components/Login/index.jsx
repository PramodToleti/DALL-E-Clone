import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import "./index.css"

import logo from "../../assets/website.png"
import GoogleAuth from "../GoogleAuth"

const loginImages = [
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687159932/lamborghini-huracan-is-dark-street-city-min_shuy08.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687159930/teenager-light-movie-projector-min_jpsruk.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687159930/teenager-light-movie-projector-min_jpsruk.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687159930/teenager-light-movie-projector-min_jpsruk.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687159929/rise-humanoids-with-advanced-headgear-generative-ai-min_mby3sc.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687159924/pink-diamond-background-round-shapes-min_os4puw.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687159922/3d-rendering-abstract-flowing-shape-with-twisted-colorful-stripes-min_ajqelx.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687159922/3d-rendered-abstract-design-elements-arrangement_1_-min_vlydtb.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687158551/astronaut-explores-outer-dark-space-generative-al_sqsakr.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687158541/view-adorable-3d-cats_seq70l.jpg",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1687158540/3d-view-holographic-layering_dp1gjm.jpg",
]

const randomImage = loginImages[Math.floor(Math.random() * loginImages.length)]

const Loading = (className) => {
  return (
    <div className={`assets-loading-container ${className.className}`}>
      <div class="assets-loader"></div>
      <p>Getting ready...</p>
    </div>
  )
}

const Login = () => {
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false)
      document.getElementsByTagName("nav")[0].style.display = "none"
      document.querySelector(".mobile-navbar").style.display = "none"
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  useEffect(() => {
    document.getElementsByClassName(
      "login-image-container"
    )[0].style.backgroundImage = `url(${randomImage})`
  }, [])

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
            <h1>
              Welcome Back <span className="wave">👋</span>
            </h1>
            <p>Let's pick up where you left off .</p>
            <form className="login-form" onSubmit={handleSubmit}>
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
                Login
              </button>

              {
                <GoogleAuth
                  handleUserDetails={handleUserDetails}
                  text={"signin_with"}
                />
              }
            </form>

            <p className="already-text">
              Don't have an account'?{" "}
              <Link to="/signup" className="login-text">
                <span className="login-text">Sign up</span>
              </Link>
            </p>
          </div>
          <div className="login-image-container"></div>
        </div>
      </motion.div>
    </>
  )
}

export default Login
