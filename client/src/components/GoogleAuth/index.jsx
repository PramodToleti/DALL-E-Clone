import React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { ToastContainer, toast } from "react-toastify"
import Cookies from "js-cookie"

import "react-toastify/dist/ReactToastify.css"

const GoogleAuth = (props) => {
  const { handleUserDetails, text } = props

  const handleSubmit = async (userDetails) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }

      const response = await fetch("http://localhost:5000/signup", options)
      const data = await response.json()
      console.log(data)

      if (response.ok) {
        Cookies.set("token", data.token)
        localStorage.setItem("userDetails", JSON.stringify(data))
        window.location.href = "/"
      } else {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: false,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      })
    }
  }

  return (
    <div>
      <ToastContainer />
      <GoogleOAuthProvider clientId="936947902810-hot60lh6r6u9rs693a21j2ufni3kolps.apps.googleusercontent.com">
        <GoogleLogin
          theme="outline"
          shape="pill"
          useOneTap={false}
          text={text}
          width="335px"
          onSuccess={(credentialResponse) => {
            const userDetails = jwt_decode(credentialResponse.credential)
            const details = {
              type: "google",
              name: userDetails.name,
              email: userDetails.email,
              password: userDetails.sub,
              logo: userDetails.picture,
            }
            handleSubmit(details)
            handleUserDetails(details, "google")
          }}
          onError={() => {
            toast.error("Login Failed")
            console.log("Login Failed")
          }}
        />
      </GoogleOAuthProvider>
    </div>
  )
}

export default GoogleAuth
