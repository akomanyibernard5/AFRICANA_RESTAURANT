import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext)

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img src={url+"/images/"+image} className='food-item-image' />
                {
                    !cartItems[id] ? (<img onClick={() => addToCart(id)} className='add' src={assets.add_icon_white} />) : (
                        <div className="food-item-counter">
                            <img style={{cursor: "pointer"}} onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
                            <p>{cartItems[id]}</p>
                            <img style={{cursor: "pointer"}} onClick={() => addToCart(id)} src={assets.add_icon_green} />
                        </div>)
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} />
                </div>
                <p className="food-item-desc">
                    {description}
                </p>
                <p className="food-item-price">
                    ${price}
                </p>
            </div>
        </div>
    )

}

export default FoodItem

