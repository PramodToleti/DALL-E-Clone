import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
/* import ProtectedRoute from "../ProtectedRoute" */

import Gallery from "../Gallery"
import PromptField from "../PromptField"
import Community from "../Community"
import Profile from "../Profile"
import Signup from "../Signup"
import Login from "../Login"

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Gallery />} />
        <Route exact path="/generate" element={<PromptField />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
