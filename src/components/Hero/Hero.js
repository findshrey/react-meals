import React from "react"
import { useNavigate } from "react-router-dom"

import { MENU } from "../../constants/routes"
import imgCooking from "../../assets/images/cooking.svg"

import styles from "./Hero.module.scss"

const Hero = () => {
   let navigate = useNavigate()

   // Navigate to menu
   const handleClick = () => {
      navigate(MENU)
   }

   return (
      <section className={styles.hero}>
         <div className={styles["hero-text"]}>
            <h2>
               Made With Love, <span>Savoured</span> With Interest
            </h2>
            <p>
               Our job is to fill your tummy with delicious food and fast and
               free delivery!
            </p>
            <button className="btn-mustard" onClick={handleClick}>
               Order Food
            </button>
         </div>
         <div className={styles["hero-img"]}>
            <img src={imgCooking} />
         </div>
      </section>
   )
}

export default Hero
