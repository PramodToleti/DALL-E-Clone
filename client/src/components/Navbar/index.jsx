import React, { useState, useEffect } from "react"
import { HiChevronDown } from "react-icons/hi"
import { BiHomeAlt2 } from "react-icons/bi"
import { RiSearchLine } from "react-icons/ri"
import { AiOutlineHeart } from "react-icons/ai"
import { RxPerson } from "react-icons/rx"
import { useLocation } from "react-router-dom"

import websiteImage from "../../assets/website.png"
import profileImage from "../../assets/profile.png"

import "./index.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [activeItem, setActiveItem] = useState("home")
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  let timeoutId
  let scrolling = false

  const handleScroll = () => {
    scrolling = true
    setVisible(false)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (scrolling) {
        setVisible(true)
      }
      scrolling = false
    }, 800)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    setVisible(false)
    timeoutId = setTimeout(() => {
      setVisible(true)
    }, 2000) // Hide mobile-nav-items after 3 seconds
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveItem("home")
      document.documentElement.style.setProperty("--active-index", 0)
    } else if (location.pathname === "/generate") {
      setActiveItem("generate")
      document.documentElement.style.setProperty("--active-index", 1)
    } else if (location.pathname === "/collections") {
      setActiveItem("collections")
      document.documentElement.style.setProperty("--active-index", 2)
    } else if (location.pathname === "/profile") {
      setActiveItem("profile")
      document.documentElement.style.setProperty("--active-index", 3)
    }
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const scrollingUp = currentScrollPos < prevScrollPos
      setPrevScrollPos(currentScrollPos)

      if (scrollingUp) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPos])

  const handleItemClick = (item, index) => {
    setActiveItem(item)
    document.documentElement.style.setProperty("--active-index", index)
  }

  const renderNavLinks = () => (
    <div className="links-container">
      <Link
        to="/"
        className={`nav-link ${activeItem === "home" ? "active-link" : ""}`}
      >
        <p onClick={() => handleItemClick("home", 0)}>DALL·E</p>
      </Link>
      <Link
        to="/generate"
        className={`nav-link ${activeItem === "generate" ? "active-link" : ""}`}
      >
        <p onClick={() => handleItemClick("generate", 0)}>Generate</p>
      </Link>
      <Link
        to="/collections"
        className={`nav-link ${
          activeItem === "collections" ? "active-link" : ""
        }`}
      >
        <p onClick={() => handleItemClick("collections", 0)}>Collections</p>
      </Link>
      <Link
        to="/profile"
        className={`nav-link ${activeItem === "profile" ? "active-link" : ""}`}
      >
        <p onClick={() => handleItemClick("profile", 0)}>Profile</p>
      </Link>
    </div>
  )

  return (
    <>
      <nav className={`navbar ${showNavbar ? "" : "navbar-hidden"}`}>
        <div className="navbar-container">
          <Link to="/">
            <div
              className="wesite-logo"
              onClick={() => {
                setActiveItem("home")
                document.documentElement.style.setProperty("--active-index", 0)
              }}
            >
              <img src={websiteImage} className="website-logo" alt="website" />
            </div>
          </Link>

          <div className="nav-links-container">{renderNavLinks()}</div>
        </div>
      </nav>

      <div className="mobile-navbar">
        <div className={`mobile-nav-items ${visible ? "visible" : "hidden"}`}>
          {/* <div className="mobile-nav-items"> */}
          <Link to="/">
            <button
              className={
                activeItem === "home"
                  ? "active-icon icon-container active-item"
                  : "icon-container nav-icons"
              }
              onClick={() => handleItemClick("home", 0)}
            >
              <BiHomeAlt2 />
            </button>
          </Link>
          <Link to="/generate">
            <button
              className={
                activeItem === "generate"
                  ? "active-icon icon-container active-item"
                  : "icon-container nav-icons"
              }
              onClick={() => {
                handleItemClick("generate", 1)
              }}
            >
              <RiSearchLine />
            </button>
          </Link>
          <Link to="/collections">
            <button
              className={
                activeItem === "collections"
                  ? "active-icon icon-container active-item"
                  : "icon-container nav-icons"
              }
              onClick={() => {
                handleItemClick("collections", 2)
              }}
            >
              <AiOutlineHeart />
            </button>
          </Link>
          <Link to="/profile">
            <button
              className={
                activeItem === "profile"
                  ? "active-icon icon-container active-item"
                  : "icon-container nav-icons"
              }
              onClick={() => {
                handleItemClick("profile", 3)
              }}
            >
              <RxPerson />
            </button>
          </Link>
          <div className="underline"></div>
        </div>
      </div>
    </>
  )
}

export default Navbar
