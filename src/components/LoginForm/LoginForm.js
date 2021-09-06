import React, { useState, useRef, useContext } from "react"

import AuthContext from "../../context/AuthContext"

const LoginForm = ({ handleAuthMode }) => {
   const emailRef = useRef()
   const passwordRef = useRef()
   const [isLoading, setIsLoading] = useState(false)

   const authCtx = useContext(AuthContext)

   const handleSubmit = (e) => {
      e.preventDefault()

      // Add validation

      setIsLoading(true)

      fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAfdliDaU39tcKz0o6mP08DN1Ie0lGmhE",
         {
            method: "POST",
            body: JSON.stringify({
               email: emailRef.current.value,
               password: passwordRef.current.value,
               returnSecureToken: true,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         }
      )
         .then((res) => {
            setIsLoading(false)

            if (res.ok) {
               return res.json()
            } else {
               return res.json().then((data) => {
                  const errorMessage =
                     data?.error?.message || "Authentication failed"

                  throw new Error(errorMessage)
               })
            }
         })
         .then((data) => {
            authCtx.login(data.idToken)
         })
         .catch((err) => {
            alert(err)
         })
   }

   return (
      <div className="login-form">
         <h3>Login</h3>
         <form onSubmit={handleSubmit}>
            <div className="form-control">
               <label>Email:</label>
               <input type="email" ref={emailRef} required />
            </div>
            <div className="form-control">
               <label>Password:</label>
               <input type="password" ref={passwordRef} required />
            </div>
            {!isLoading ? <button type="submit">Login</button> : "Logging In"}
            <button type="button" onClick={handleAuthMode}>
               Create new account
            </button>
         </form>
      </div>
   )
}

export default LoginForm
