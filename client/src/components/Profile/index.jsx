import React from "react"
import { motion } from "framer-motion"

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      style={{
        position: "absolute",
      }}
    >
      Profile
    </motion.div>
  )
}

export default Profile
