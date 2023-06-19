import React, { useEffect, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Circletype from "circletype"
import { Link, useNavigate } from "react-router-dom"
import { BsArrowDown, BsArrowUpRight } from "react-icons/bs"
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi"
import SwiperCore, { EffectCoverflow, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ReactTypingEffect from "react-typing-effect"
import { useInView } from "react-intersection-observer"

import "./index.css"
import "swiper/swiper-bundle.min.css"
import "swiper/swiper.min.css"

import Loading from "../Loading"

import Image from "../Image"
import ImagePrompts from "../../ImagePrompts"
import sliderImg1 from "../../assets/carousel/generated1.png"
import sliderImg2 from "../../assets/carousel/generated2.png"
import sliderImg3 from "../../assets/carousel/generated3.png"
import sliderImg4 from "../../assets/carousel/generated4.png"

import DalleVideo from "../../assets/dalle_video.mp4"
import DalleVideo2 from "../../assets/dalle_video2.mp4"

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const slide_img = [sliderImg1, sliderImg2, sliderImg3, sliderImg4]

SwiperCore.use([EffectCoverflow, Pagination])

const Gallery = () => {
  const navigate = useNavigate()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const textRef = useRef(null)
  const swiperRef = useRef(null)
  const [showScroll, setShowScroll] = useState(false)
  const [viewRef, inView] = useInView()
  const [hasViewed, setHasViewed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (inView && !hasViewed) {
    setHasViewed(true)
  }

  //load assets
  /*  useEffect(() => {
    // Simulating a delay to represent asset loading time
    const nav = document.getElementsByTagName("nav")[0]
    const mobileNav = document.querySelector(".mobile-navbar")
    nav.style.display = "none"
    mobileNav.style.display = "none"
    setTimeout(() => {
      setLoading(false)
      setLoaded(true)
      nav.style.display = "flex"
      mobileNav.style.display = "flex"
    }, 3000)
  }, []) */

  //Gradient mesh animation after 3 seconds

  useEffect(() => {
    const text = new Circletype(textRef.current)
    text.radius(30)
    let timeoutId
    timeoutId = setTimeout(() => {
      setShowScroll(true)
    }, 3000)

    const handleScroll = () => {
      const gradientContainer = document.querySelector(
        ".mesh-gradient-container"
      )
      const imagesGradientContainer = document.querySelector(
        ".images-container-background-gradient"
      )
      const imagesGradientContainerMobile = document.querySelector(
        ".images-container-background-gradient-m"
      )

      if (window.scrollY > 20) {
        setShowScroll(false)
        gradientContainer.style.transition = "all 0.5s ease-out"
        gradientContainer.style.transform = `translate3d(200px, 300px, 0)`

        if (window.scrollY > 400) {
          gradientContainer.style.opacity = "0"

          imagesGradientContainer.style.transition = "all 0.5s ease-out"
          imagesGradientContainer.style.opacity = "1"
          imagesGradientContainer.style.backgroundImage =
            "linear-gradient(to bottom, #ef32d995, #56CCF2)"
          //Mobile
          imagesGradientContainerMobile.style.transition = "all 0.5s ease-out"
          imagesGradientContainerMobile.style.opacity = "1"
          imagesGradientContainerMobile.style.backgroundImage =
            "linear-gradient(to bottom, #ef32d995, #56CCF2)"
        } /* else {
            imagesGradientContainer.style.transition = "all 0.5s ease-out"
            imagesGradientContainer.style.opacity = "0"
            imagesGradientContainer.style.backgroundColor = "transparent"
          } */
      } else {
        setShowScroll(true)
      }
      if (window.scrollY < 300) {
        gradientContainer.style.transition = "all 0.5s ease-out"
        gradientContainer.style.opacity = "1"
        gradientContainer.style.transform = `translate3d(50px, 0px, 0)`

        imagesGradientContainer.style.transition = "all 0.5s ease-out"
        imagesGradientContainer.style.opacity = "0"
        imagesGradientContainer.style.backgroundColor = "transparent"

        //Mobile
        imagesGradientContainerMobile.style.transition = "all 0.5s ease-out"
        imagesGradientContainerMobile.style.opacity = "0"
        imagesGradientContainerMobile.style.backgroundColor = "transparent"
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  //Move gradient mesh on mouse move
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = -(e.clientX - rect.left) / rect.width
    const y = -(e.clientY - rect.top) / rect.height
    setPos({ x, y })
  }

  //typing animation
  const renderTypingAnimation = () => {
    return (
      <p ref={viewRef}>
        {hasViewed ? (
          <ReactTypingEffect
            text={[
              "An astronaut playing basketball with cats in space,digital art",
            ]}
            speed={50}
            eraseDelay={1000000}
            typingDelay={700}
            displayTextRenderer={(text, i) => {
              return text.split("").map((char, i) => {
                const key = `${i}`
                return (
                  <span
                    key={key}
                    style={{
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    {char}
                  </span>
                )
              })
            }}
          />
        ) : null}
      </p>
    )
  }

  //carousel controllers
  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.slideNext) {
      swiperRef.current.slideNext()
    }
  }

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.slidePrev) {
      swiperRef.current.slidePrev()
    }
  }

  return (
    <>
      <AnimatePresence>
        {/*  {loading ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <Loading />
          </motion.div>
        ) : ( */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          className="main-container"
          onMouseMove={handleMouseMove}
          key="content"
        >
          <div className="gallery-container">
            <div className="hero-container">
              <div
                className="mesh-gradient-container"
                style={{
                  transform: `translate3d(${pos.x * 105}px, ${
                    pos.y * 80
                  }px, 0)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div className="mesh-gradient"></div>
                <div className="mesh-gradient"></div>
                <div className="mesh-gradient"></div>
                <div className="mesh-gradient"></div>
              </div>

              <div>
                <motion.ul
                  className="hero-title"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {["D", "A", "L", "L", "E", "·", "2"].map((letter, index) => (
                    <motion.li key={index} variants={item}>
                      {letter}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.p
                  className="hero-description"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 2.5,
                    },
                  }}
                >
                  DALLE 2 is an Al system that can create realistic images and
                  art from a description in natural language.
                </motion.p>
              </div>
              <motion.div
                className="hero-btns-container"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 2.5,
                  },
                }}
              >
                <Link
                  to="/generate"
                  style={{ textDecoration: "none", zIndex: "100" }}
                >
                  <button type="button" className="try-btn">
                    Try DALL·E
                  </button>
                </Link>

                <Link
                  to="https://www.instagram.com/openaidalle/"
                  target="_blank"
                  style={{ textDecoration: "none", zIndex: "100" }}
                >
                  <button type="button" className="follow-btn">
                    Follow on Instagram
                  </button>
                </Link>
              </motion.div>
              <div className="landing-page-image">
                <motion.div
                  className="landing-image-gradient"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 0.4,

                    transition: {
                      delay: 2,
                    },
                  }}
                  exit={{
                    opacity: 0,
                  }}
                ></motion.div>
                <motion.img
                  initial={{
                    opacity: 0,
                    x: -40,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      delay: 2,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -40,
                    y: 40,
                  }}
                  src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1684754186/landing-rocket_g2jagh.png"
                  className="landing-rocket"
                  alt="rocket"
                />
                <motion.img
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 2,
                    },
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1684752153/landing-dalle-1_w9ppiz.png"
                  alt="landing-dalle-1"
                  className="landing-image"
                />
                {/* <img
              src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1684777874/landing-task_k2d9t4.png"
              alt="landing-task"
              className="landing-task"
            /> */}
              </div>
            </div>

            <button
              className={`scroll-container ${
                showScroll ? "circle-container" : "circle-container-hide"
              }`}
              onClick={() => {
                window.scrollTo({ top: 600, behavior: "smooth" })
              }}
            >
              <div className="circle-text" ref={textRef}>
                scroll down · scroll down ·scroll down ·
              </div>
              <div className="arrow-icon">
                <BsArrowDown />
              </div>
            </button>

            <div className="images-container-mobile">
              <div className="images-container-background">
                <div className="images-container-background-gradient-m"></div>
              </div>
              {ImagePrompts.map((each) => (
                <Image
                  src={each.image}
                  alt={each.alt}
                  prompt={each.prompt}
                  id={each.id}
                />
              ))}
            </div>
            <div className="images-container-desktop">
              <div className="images-container-background">
                <div className="images-container-background-gradient"></div>
              </div>
              {ImagePrompts.map((each, i) => (
                <Image src={each.image} alt={each.alt} prompt={each.prompt} />
              ))}
            </div>
          </div>

          <div className="context-container">
            <div className="context-inner">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: -40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.7,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -40,
                }}
              >
                DALL·E 2 can create original, realistic images and art from a
                text description. It can combine concepts, attributes, and
                styles.
              </motion.h1>

              <div className="carousel-container">
                <div className="carousel-input">
                  <p className="carousel-desktop-text">
                    DALL·E 2 can create original, realistic images and art from
                    a text description. It can combine concepts, attributes, and
                    styles.
                  </p>
                  <div className="input-container">
                    <h5>Input</h5>
                    {renderTypingAnimation()}
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: false,
                    }}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    pagination={true}
                    className="mySwiper"
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                  >
                    {slide_img.map((img, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <img src={img} alt="" />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                  {!swiperRef.current?.isBeginning && (
                    <div className="swiper-button-prev" onClick={handlePrev}>
                      <span className="carousel-controller-prev">
                        <HiOutlineArrowNarrowLeft />
                      </span>
                    </div>
                  )}
                  {!swiperRef.current?.isEnd && (
                    <div className="swiper-button-next" onClick={handleNext}>
                      <span className="carousel-controller-next">
                        <HiOutlineArrowNarrowRight />
                      </span>
                    </div>
                  )}
                  <div className="carousel-gradient"></div>
                </div>
                <p className="carousel-mobile-text">
                  DALL·E 2 can create original, realistic images and art from a
                  text description. It can combine concepts, attributes, and
                  styles.
                </p>
              </div>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: -40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.7,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -40,
                }}
              >
                In January 2021, OpenAI introduced DALL·E. One year later, our
                newest system, DALL·E 2, generates more realistic images with 4x
                greater resolution.
              </motion.h1>

              <motion.div
                className="image-comparison-container"
                initial={{
                  opacity: 0,
                  y: -40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.7,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -40,
                }}
              >
                <div className="comparison-image">
                  <img
                    src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1683909480/dall-e-1_f2ahxg.jpg"
                    alt=""
                  />
                  <p style={{ marginTop: "10px" }}>DALL·E 1</p>
                </div>
                <div className="comparison-image">
                  <img
                    src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1683909596/dall-e-2_pkmia6.jpg"
                    alt=""
                  />
                  <p style={{ marginTop: "10px" }}>DALL·E 2</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="applications-container">
            <div className="applications-inner">
              <h1>Applications</h1>
              <motion.div
                className="video-gradient"
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                  transition: {
                    delay: 1.5,
                  },
                }}
                exit={{
                  opacity: 0,
                }}
              ></motion.div>
              <div className="video-container">
                <div>
                  <video
                    src={DalleVideo}
                    loop
                    muted
                    autoPlay
                    className="dalle-video"
                  ></video>
                  <p>Microsoft Bing</p>
                </div>
              </div>
              <div className="video-text-container">
                <p>
                  <span className="microsoft-name">Microsoft</span> is bringing
                  DALL·E to a new graphic design app called{" "}
                  <span
                    className="designer"
                    onClick={() => {
                      window.open("https://designer.microsoft.com/", "_blank")
                    }}
                  >
                    Designer
                  </span>
                  , which helps users create professional quality social media
                  posts, invitations, digital postcards, graphics, and more.
                </p>
                <p className="desktop-video-text">
                  Microsoft is also integrating DALL·E in Bing and Microsoft
                  Edge with Image Creator, allowing users to create images if
                  web results don't return what they're looking for.
                </p>
              </div>
            </div>
            <div className="applications-inner" style={{ marginTop: "80px" }}>
              <motion.div
                className="video-gradient-2"
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                  transition: {
                    delay: 1.5,
                  },
                }}
                exit={{
                  opacity: 0,
                }}
              ></motion.div>
              <div className="video-container">
                <div>
                  <video
                    src={DalleVideo2}
                    loop
                    muted
                    autoPlay
                    className="dalle-video"
                  ></video>
                  <p>Mixtiles</p>
                </div>
              </div>
              <div className="video-text-container">
                <p>
                  <span className="mixitiles-name">Mixtiles</span> is a
                  fast-growing photo startup. They use software and an easy
                  hanging experience to help millions of people create beautiful
                  photo walls. Mixtiles uses the DALL·E API to create and frame
                  emotionally resonating artwork, by guiding users through a
                  creative process that captures childhood memories, dream
                  destinations, and more.
                </p>
                <p className="desktop-video-text">
                  We’re excited to see what our customers will do with DALL·E
                  and what creative ideas they’ll come up with.
                </p>
              </div>
            </div>
            <hr className="seperator" />
            <div className="start-creating-container">
              <h1>Start creating images with DALL·E</h1>
              <button
                className="try-dalle-btn"
                onClick={() => navigate("/generate")}
              >
                Try DALL·E <BsArrowUpRight />{" "}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="user">
        <a
          href="https://linkedin.com/in/pramodtoleti/"
          target="_blank"
          className="user-inner"
        >
          {/* <img src={linkedIn} alt="linkedIn" className="linkedIn" /> */}
          @PramodToleti
        </a>
      </div>
    </>
  )
}

export default Gallery
