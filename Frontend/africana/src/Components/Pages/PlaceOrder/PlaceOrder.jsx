import React, { useContext, useEffect, useState} from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../../Context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, userId } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({
      ...data, [name]: value
    });
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (data.phone.length < 10) {
      alert("Enter a valid phone number");
      return;
    }
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    console.log("Placing Order: ", orderData);

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      console.log("Response: ", response.data);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Order placement failed: ", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    }
    else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} action="" className='place-order' id="order">
      <div className="place-order-left">
        <p className='title'>
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder='Email address' />
        <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name="state" value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="zipcode" value={data.zipcode} type="text" placeholder='Zip code' />
          <input required onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}.00</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}.00</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Order;