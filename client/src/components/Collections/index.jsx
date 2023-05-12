import React from "react"
import { motion } from "framer-motion"

const Collections = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      style={{ position: "absolute" }}
    >
      Collections
    </motion.div>
  )
}

export default Collections
