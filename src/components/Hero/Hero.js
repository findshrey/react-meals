import React from "react"

import styles from "./Hero.module.scss"
import imgCooking from "../../assets/illustrations/cooking.svg"

const Hero = () => {
   return (
      <section className={styles.hero}>
         <div className={styles["hero-text"]}>
            <h2>
               Made With Love, <span>Savoured</span> With Interest
            </h2>
            <p>
               Our job is to fill your tummy with delicious food and fast
               delivery!
            </p>
            <button className="btn-red">Order Food</button>
         </div>
         <div className={styles["hero-img"]}>
            <img src={imgCooking} />
         </div>
      </section>
   )
}

export default Hero
