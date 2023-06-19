const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Model
const User = require("./models/user/user.model")

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  })

app.get("/", (_, res) => {
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

app.post("/signup", async (req, res) => {
  const { name, email, password, type } = req.body

  try {
    //Validations
    if (name === "") {
      return res.status(400).json({ error: "Name cannot be empty" })
    } else if (email === "") {
      return res.status(400).json({ error: "Email cannot be empty" })
    } else if (password === "") {
      return res.status(400).json({ error: "Password cannot be empty" })
    }

    const isPresent = await User.findOne({ email })

    if (isPresent && type !== "google") {
      return res.status(400).json({ error: "User already exists" })
    } else if (password.length < 5) {
      return res
        .status(400)
        .json({ error: "Password must be atleast 5 characters" })
    } else if (
      (type === "google" && !isPresent) ||
      (type !== "google" && !isPresent)
    ) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({
        name,
        email,
        password: hashedPassword,
      })

      await user.save()
      //Generate JWT token
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "5d",
      })

      res.status(201).json({
        message: "Account created successfully",
        token,
        userId: user._id,
        name: user.name,
      })
    } else if (type === "google" && isPresent) {
      const payload = {
        id: isPresent._id,
        name: isPresent.name,
        email: isPresent.email,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "5d",
      })

      res.status(201).json({
        message: "Account created successfully",
        token,
        userId: isPresent._id,
        name: isPresent.name,
      })
    } else {
      return res.status(400).json({ error: "Something went wrong" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    //validate Email
    const isEmail = /\S+@\S+\.\S+/.test(email)
    if (!isEmail) {
      return res.status(400).json({ error: "Invalid Email" })
    } else {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ error: "User not found" })
      } else {
        const isPasswordMathed = await bcrypt.compare(password, user.password)

        if (!isPasswordMathed) {
          return res.status(400).json({ error: "Invalid Password" })
        } else {
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "5d",
          })

          res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            name: user.name,
          })
        }
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "An error occurred" })
  }
})
