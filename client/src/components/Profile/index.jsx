import React from "react"
import { motion } from "framer-motion"

import "./index.css"
import Cookies from "js-cookie"

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
      <div className="profile-container">
        <div className="profile-inner">
          <h1>Profile</h1>
          <div className="details-container">
            <div className="side-bar">
              <img
                src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1687191778/7309667_mx9gpf.jpg"
                alt="avatar"
                className="avatar"
              />
            </div>
            <div>
              <div className="user-details">
                <h3>Username</h3>
                <p>Pramod</p>
              </div>

              <div className="user-details">
                <h3>email</h3>
                <p>pramodraina047@gmail.com</p>
              </div>

              <div className="user-details">
                <h3>password</h3>
                <p>********</p>
              </div>

              <div className="details-btn">
                <button type="button" className="btn btn-primary">
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    Cookies.remove("token")
                    window.location.href = "/login"
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
