import { BrowserRouter as Router } from "react-router-dom"
import { useEffect } from "react"

import Navbar from "./components/Navbar"
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes"

const App = () => {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  )
}

export default App
