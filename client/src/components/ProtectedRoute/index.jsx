import React from "react"
import { Route, Redirect } from "react-router-dom"
import Cookies from "js-cookie"

const ProtectedRoute = (props) => {
  const token = Cookies.get("token")
  if (!token) {
    return <Redirect to="/signup" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
