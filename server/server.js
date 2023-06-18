const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get("/", (req, res) => {
  res.send("Hello from server")
})

app.post("/generate", async (req, res) => {
  try {
    const options = {
      method: "POST",
      url: "https://openai80.p.rapidapi.com/images/generations",
      headers: {
        "content-type": "application/json",
        "Accept-Encoding": "application/json",
        "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
        "X-RapidAPI-Host": "openai80.p.rapidapi.com",
      },
      data: {
        prompt: req.body.prompt, // Get the prompt from the request body
        n: 1,
        size: "1024x1024",
      },
    }

    const response = await axios.request(options)
    console.log(response.data)

    res.status(200).json(response.data) // Send the generated response back to the client
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "An error occurred" })
  }
})
