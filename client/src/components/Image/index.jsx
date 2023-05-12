import React, { useState } from "react"
import { motion } from "framer-motion"
import "./index.css"
import { Link, useNavigate } from "react-router-dom"

const ImageVariants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.6,
    },
  },
}

const Image = (props) => {
  const [hover, setHover] = useState(false)
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = (event) => {
    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()
    const isInside =
      bounds.top <= event.clientY &&
      event.clientY <= bounds.bottom &&
      bounds.left <= event.clientX &&
      event.clientX <= bounds.right
    if (!isInside) {
      setHover(false)
    }
  }

  const handleTry = () => {
    navigate("/generate", { state: { prompt: props.prompt } })
  }

  return (
    <motion.div
      className="image-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      onClick={handleTry}
    >
      <motion.img
        src={props.src}
        alt={props.alt}
        className="images"
        key={props.id}
        variants={ImageVariants}
      />

      <div className={`image-overlay ${hover ? "hover" : ""}`}>
        {props.prompt}

        <button className="image-overlay-button">Click to Try</button>
      </div>
    </motion.div>
  )
}

export default Image
