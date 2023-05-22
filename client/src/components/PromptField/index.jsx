import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

import surprisePrompts from "../../surprise-prompts"

import "./index.css"
import { useLocation } from "react-router-dom"

const PromptField = () => {
  const location = useLocation()
  const [isFocused, setFocused] = useState(false)
  const [promptValue, setPromptValue] = useState(location.state?.prompt || "")

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

  const generatePrompt = () => {
    const randomPrompt =
      surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)]
    setPromptValue(randomPrompt)
  }

  const generateImage = () => {
    console.log("Generate image")
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
      <div className="prompt-field-container">
        <div className="prompt-heading-container">
          <p className="generate-prompt-heading">
            Start with a detailed description
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

      {/* <div
        style={{
          marginTop: "2rem",
        }}
      >
        <img
          src="https://deedy.be/wp-content/uploads/2021/11/60259-web-design-illustration.gif"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div> */}
    </motion.div>
  )
}

export default PromptField
