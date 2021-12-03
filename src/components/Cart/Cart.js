import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"

import * as ROUTES from "../../constants/routes"
import CartContext from "../../context/CartContext"
import CartItem from "./CartItem"
import CartSummary from "./CartSummary"
import useHttp from "../../hooks/useHttp"

import styles from "./Cart.module.scss"

const Cart = () => {
   const { isLoading, error, sendRequest: placeOrder } = useHttp()
   const cartCtx = useContext(CartContext)

   let navigate = useNavigate()

   const handleAddItem = (item) => {
      cartCtx.addItem({ ...item, quantity: 1 })
   }

   const handleRemoveItem = (id) => {
      cartCtx.removeItem(id)
   }

   // Place order if autheticated
   const handleOrder = () => {
      placeOrder(
         {
            url: "https://food-order-app-35a86-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: cartCtx.cartItems,
         },
         (data) => {
            console.log(data)
         }
      )
   }

   // Check if cart has items
   const emptyCart = cartCtx.cartItems.length === 0

   return (
      <div className={styles.cart}>
         <header className={styles["cart-head"]}>
            <h2>MY CART</h2>
         </header>
         {emptyCart ? (
            <div className={styles["empty-cart"]}>
               <p>
                  YOUR CART IS EMPTY. <br />
                  LET'S START AN ORDER!
               </p>
               <button onClick={() => navigate(ROUTES.MENU)}>
                  Start Order
               </button>
            </div>
         ) : (
            <div className={styles["cart-inner"]}>
               <section>
                  <ul>
                     {cartCtx.cartItems.map((item) => (
                        <CartItem
                           key={item.id}
                           item={item}
                           handleAddItem={handleAddItem}
                           handleRemoveItem={handleRemoveItem}
                        />
                     ))}
                  </ul>
               </section>
               <CartSummary
                  items={cartCtx.cartItems}
                  totalAmount={cartCtx.totalAmount}
                  handleOrder={handleOrder}
               />
            </div>
         )}
      </div>
   )
}

export default Cart
