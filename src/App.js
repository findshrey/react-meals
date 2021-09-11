import React, { useContext } from "react"
import { Switch, Redirect, Route } from "react-router-dom"

import AuthPage from "./pages/AuthPage"
import AuthContext from "./context/AuthContext"
import Cart from "./pages/Cart"
import Layout from "./components/Layout/Layout"
import Menu from "./pages/Menu"
import MenuCategory from "./pages/MenuCategory"
import NotFound from "./pages/NotFound"
import ProfilePage from "./pages/ProfilePage"

const App = () => {
   const authCtx = useContext(AuthContext)

   return (
      <Layout>
         <Switch>
            {!authCtx.isLoggedIn && (
               <Route path="/auth">
                  <AuthPage />
               </Route>
            )}
            <Route path="/profile">
               {authCtx.isLoggedIn ? <ProfilePage /> : <Redirect to="/auth" />}
            </Route>
            <Route path="/menu" exact>
               <Menu />
            </Route>
            <Route path="/menu/:category">
               <MenuCategory />
            </Route>
            <Route path="/cart">
               <Cart />
            </Route>
            <Route path="*">
               <NotFound />
            </Route>
         </Switch>
      </Layout>
   )
}

export default App
