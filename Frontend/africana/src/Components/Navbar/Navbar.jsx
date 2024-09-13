import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../Context/StoreContext';


const Navbar = ({ setShowLogin }) => {
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }
    return (
        <div className='navbar'>
            <Link to="/"><h1 className='logo'>𝔸𝕗𝕣𝕚𝕔𝕒𝕟 𝔽𝕠𝕠𝕕𝕤</h1></Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "conatct-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} />
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} /></Link>
                    <div className={getTotalCartAmount() ? "dot" : ""} ></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Sign In
                </button> :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} />
                        <ul className='nav-profile-dropdowm'>
                            <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} /><p>Order</p></li>
                            <hr />
                            <li onClick={logout} ><img src={assets.logout_icon} /><p>Logout</p></li>
                        </ul>
                    </div>}


            </div>
        </div>
    )
}

export default Navbar
