import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import "./index.css"

const Community = () => {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef(null)

  const openPopup = () => {
    console.log("open")
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  const handleJoin = () => {
    openPopup()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      style={{ position: "absolute" }}
    >
      {isOpen && (
        <div className="popup-community" ref={popupRef}>
          <button className="close-btn" onClick={closePopup}>
            X
          </button>
          <h3>Attention ⚠️</h3>
          <p>
            This feature is still in development. We are working hard to bring a
            community to you. Stay tuned! 🤩
          </p>
        </div>
      )}
      <div className="community-container">
        <div className="community-inner">
          <div className="community-text">
            <h1>Building the future of AI together</h1>
            <p>
              Al is transforming the world, and we are leading the charge. We
              are constructing the future of Al as a collective.{" "}
            </p>
            <button className="join-button" onClick={handleJoin}>
              Join Community
            </button>
          </div>
          <div className="community-image"></div>
          <div className="btn-background"></div>
          <button className="community-button" onClick={handleJoin}>
            Join
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Community
