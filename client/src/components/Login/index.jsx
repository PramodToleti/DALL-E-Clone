import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Oval } from "react-loader-spinner"
import { ToastContainer, toast } from "react-toastify"
import Cookies from "js-cookie"

import "./index.css"
import "react-toastify/dist/ReactToastify.css"

import logo from "../../assets/website.png"
import GoogleAuth from "../GoogleAuth"
import loginImages from "../../LoginImages"

var randomImage

const Loading = (className) => {
  return (
    <div className={`assets-loading-container ${className.className}`}>
      <div className="assets-loader"></div>
      <p>Getting ready...</p>
    </div>
  )
}

const Login = () => {
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [btnLoad, setBtnLoad] = useState(false)
  const location = useLocation()
  const pathName = location.pathname.split("/")[1]

  const token = Cookies.get("token")
  if (token) {
    window.location.href = "/"
  }

  //get random image for login page
  useEffect(() => {
    randomImage = loginImages[Math.floor(Math.random() * loginImages.length)]
  }, [pathName])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnLoad(true)

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(
      "https://dalle-clone-backend-l19g.onrender.com/login",
      options
    )
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      setBtnLoad(false)
      Cookies.set("token", data.token)
      localStorage.setItem("userDetails", JSON.stringify(data))
      window.location.href = "/"
    } else {
      setBtnLoad(false)
      toast.error(data.error, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      })
    }
  }

  return (
    <>
      <ToastContainer />
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
                {btnLoad ? (
                  <Oval
                    height={30}
                    width={30}
                    color="white"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#ffffff"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                ) : (
                  <span>Login</span>
                )}
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
