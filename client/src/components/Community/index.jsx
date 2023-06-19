import React from "react"
import { motion } from "framer-motion"

import "./index.css"

const Community = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      style={{ position: "absolute" }}
    >
      <div className="community-container">
        <div className="community-inner">
          <div className="community-text">
            <h1>Building the future of AI together</h1>
            <p>
              Al is transforming the world, and we are leading the charge. We
              are constructing the future of Al as a collective.{" "}
            </p>
            <button className="join-button">Join Community</button>
          </div>
          <div className="community-image"></div>
          <div className="btn-background"></div>
          <button className="community-button">Join</button>
        </div>
      </div>
    </motion.div>
  )
}

export default Community
