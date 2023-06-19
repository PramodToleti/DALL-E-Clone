import React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const GoogleAuth = (props) => {
  const { handleUserDetails, text } = props

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
              name: userDetails.name,
              email: userDetails.email,
              password: userDetails.sub,
              logo: userDetails.picture,
            }
            handleUserDetails(details, "google")
            localStorage.setItem("userDetails", JSON.stringify(details))
            window.location.href = "/"
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
