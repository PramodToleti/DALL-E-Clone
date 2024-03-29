import "../init"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { saveAs } from "file-saver"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { RiShareForwardFill } from "react-icons/ri"
import { ToastContainer, toast } from "react-toastify"
import Joyride from "react-joyride"
import Cookies from "js-cookie"

import surprisePrompts from "../../surprise-prompts"
import tips from "../../tips"
import puffyWomen from "../../assets/puffy-women.png"
import heart from "../../assets/heart.png"

import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import { useLocation } from "react-router-dom"

const steps = [
  {
    target: ".generate-prompt-btn",
    content: "Click here to generate a random prompt",
  },
  {
    target: ".generate-btn",
    content: "Click here to generate an image",
  },
]

const displayOnboard =
  localStorage.getItem("onboarding") === null ? true : false

const PromptField = () => {
  const location = useLocation()
  const [isFocused, setFocused] = useState(false)
  const [promptValue, setPromptValue] = useState(location.state?.prompt || "")
  const [generatedImages, setGeneratedImages] = useState([])
  const [favorite, setFavorite] = useState(false)
  const [favIndex, setFavIndex] = useState(null)
  const [favoriteImages, setFavoriteImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [onboard, setDisplayOnboard] = useState(true)

  const token = Cookies.get("token")
  if (!token) {
    window.location.href = "/signup"
  }

  useEffect(() => {
    const inputDiv = document.getElementById("input-div")
    const inputDiv2 = document.getElementById("input-div-2")

    const handleFocusIn = () => {
      inputDiv.style.boxShadow = "0px 5px 9px 2px rgba(0, 0, 82, 0.1)"
      inputDiv2.style.boxShadow = "0px 5px 9px 2px rgba(0, 0, 82, 0.1)"
      setFocused(true)
    }

    const handleFocusOut = () => {
      inputDiv.style.boxShadow = ""
      inputDiv2.style.boxShadow = ""
      setFocused(false)
    }

    inputDiv.addEventListener("focusin", handleFocusIn)
    inputDiv.addEventListener("focusout", handleFocusOut)

    inputDiv2.addEventListener("focusin", handleFocusIn)
    inputDiv2.addEventListener("focusout", handleFocusOut)

    // Clean up the event listeners when component unmounts
    return () => {
      inputDiv.removeEventListener("focusin", handleFocusIn)
      inputDiv.removeEventListener("focusout", handleFocusOut)

      inputDiv2.removeEventListener("focusin", handleFocusIn)
      inputDiv2.removeEventListener("focusout", handleFocusOut)
    }
  }, [])

  //Generate random prompt
  const generatePrompt = () => {
    const randomPrompt =
      surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)]
    setPromptValue(randomPrompt)
  }

  //Generate random tips
  const renderTips = (tip) => {
    const tipValue = tip.tip
    const example = tip.example
    return (
      <div className="tip-inner">
        <p>Tip</p>
        <span> {tipValue}</span>
        <p>"{example}"</p>
      </div>
    )
  }

  //Download image
  const handleDownload = (imageUrl) => {
    saveAs(imageUrl, "dalle-image.png")
  }

  //Api call to generate image
  const generateImage = () => {
    if (promptValue === "") return
    setIsLoading(true)
    async function fetchImage() {
      const url = `https://dalle-clone-backend-l19g.onrender.com/generate`
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptValue,
        }),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        setIsLoading(false)
        setGeneratedImages(data.data)
      } else {
        setIsLoading(false)
        console.log(data)
      }
    }

    fetchImage()
  }

  const generateBtnStyles = promptValue !== "" ? "generate-btn-active" : ""

  return (
    <motion.div
      className="main-container"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      style={{
        position: "absolute",
      }}
    >
      <ToastContainer />
      {localStorage.getItem("onboarding") === null && (
        <Joyride
          steps={steps}
          run={displayOnboard}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          callback={(data) => {
            if (data.status === "finished" || data.status === "skipped") {
              if (localStorage.getItem("onboarding")) return
              localStorage.setItem("onboarding", true)
              setDisplayOnboard(false)
            }
          }}
        />
      )}

      <div className="prompt-field-container">
        <div className="prompt-heading-container">
          <p className="generate-prompt-heading">
            {isLoading
              ? "Edit the detailed description"
              : "Start with a detailed description"}
          </p>
          <button className="generate-prompt-btn" onClick={generatePrompt}>
            Surprise Me
          </button>
        </div>
        <div className="input-container-mobile" id="input-div">
          <textarea
            className="input-field"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            maxLength="400"
            spellCheck="false"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
          ></textarea>

          {promptValue === "" ? (
            <button className="surprise-me-btn" onClick={generatePrompt}>
              Surprise Me
            </button>
          ) : (
            <button className="surprise-me-btn" onClick={generateImage}>
              Generate
            </button>
          )}
        </div>
        <div className="prompt-field-desktop">
          <div className="input-container-desktop" id="input-div-2">
            <textarea
              className="input-field-desktop"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              maxLength="400"
              spellCheck="false"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              style={{
                resize: "none",
                whiteSpace: "nowrap",
                overflowX: "auto",
              }}
            ></textarea>
            <button
              className={`${generateBtnStyles} generate-btn`}
              onClick={generateImage}
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      <div className="image-loading-container">
        {isLoading ? (
          <>
            <div className="loader"></div>
            <div className="tips-container">
              {renderTips(tips[Math.floor(Math.random() * tips.length)])}
            </div>
          </>
        ) : (
          <>
            {generatedImages.length > 0 ? (
              <>
                <span className="results">
                  RESULTS <hr />
                </span>
                <div className="image-container-2">
                  {generatedImages.map((image, index) => (
                    <div className="generated-image-container" key={index}>
                      <img
                        key={index}
                        src={image.url}
                        alt="generated-image"
                        className="generated-image"
                        onClick={() => handleDownload(image.url)}
                      />
                      <div className="image-btns-container">
                        {favorite && favIndex === index ? (
                          <AiFillHeart
                            className="heart-btn"
                            onClick={() => {
                              setFavorite(false)
                              setFavIndex(index)
                              setFavoriteImages(
                                favoriteImages.filter(
                                  (img) => img.url !== image.url
                                )
                              )
                              toast.success("Removed from favorites", {
                                position: "top-center",
                                pauseOnHover: false,
                                autoClose: 2000,
                                style: {
                                  backgroundColor: "#000",
                                  color: "#fff",
                                },
                              })
                            }}
                          />
                        ) : (
                          <AiOutlineHeart
                            className="favorite-btn"
                            onClick={() => {
                              setFavorite(true)
                              setFavIndex(index)
                              setFavoriteImages((prev) => [...prev, image])
                              toast.success("Added to favorites", {
                                position: "top-center",
                                pauseOnHover: false,
                                autoClose: 2000,
                                style: {
                                  backgroundColor: "#000",
                                  color: "#fff",
                                },
                              })
                            }}
                          />
                        )}
                        {<RiShareForwardFill className="share-btn" />}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-image-container">
                <img
                  src={puffyWomen}
                  alt="puffy-women"
                  className="puffy-women"
                />
                <p className="no-image-text">
                  Show me what you got! Explore your
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>creativity. </span>{" "}
                    <img src={heart} alt="heart" className="heart" />
                  </div>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default PromptField
