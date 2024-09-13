import React from 'react'
import "./Navbar.css"
import { assets } from "../../assets/assets"

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="logo">
                <p className='logo-1'>𝔸𝔽ℝ𝕀ℂ𝔸ℕ 𝔽𝕆𝕆𝔻𝕊</p>
                <p className='logo-2'>𝔸𝕕𝕞𝕚𝕟 ℙ𝕒𝕟𝕖𝕝</p>
            </div>
            <img src={assets.profile_image} className='profile' />

        </div>
    )
}

export default Navbar
