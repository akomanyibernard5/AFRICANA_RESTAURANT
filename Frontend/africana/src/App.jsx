import React, { useState } from "react"
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from "react-router-dom"
import Home from "./Components/Pages/Home/Home"
import Cart from "./Components/Pages/Cart/Cart"
import PlaceOrder from "./Components/Pages/PlaceOrder/PlaceOrder"
import Footer from "./Components/Footer/Footer"
import Verify from "./Components/Pages/Verify/Verify"
import LoginPopup from "./Components/LoginPopup/LoginPopup"
import MyOrders from "./Components/Pages/MyOrders/MyOrders"

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ?
        <LoginPopup setShowLogin={setShowLogin} />
        : <>
        </>
      }
      <>
        <div className='app'>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify/>}/>
            <Route  path="/myorders" element={<MyOrders/>} />
          </Routes>
        </div>
        <Footer />
      </>
    </>
  )
}

export default App
