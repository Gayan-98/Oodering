import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import SubmitButton from "./common/SubmitButton";
import axios from "axios";
import { api } from "../config";
import toast from "react-hot-toast";

function Cart({ cartItem, setCartItem }) {
  const [orderNumber, setOrderNumber] = useState("");

  let total = 0;
  cartItem.forEach((item) => {
    total += item.pric * item.qty;
  });

  const handleAdd = (itemId) => {
    const newCartItems = cartItem.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          qty: item.qty + 1,
        };
      }
      return item;
    });

    setCartItem(newCartItems);
  };

  const handleReduce = (itemId) => {
    const newCartItems = cartItem.map((item) => {
      if (item.id === itemId && item.qty > 1) {
        return {
          ...item,
          qty: item.qty - 1,
        };
      }
      return item;
    });

    setCartItem(newCartItems);
  };

  const handleRemove = (itemId) => {
    const newCartItems = cartItem.filter((item) => {
      return item.id !== itemId;
    });

    setCartItem(newCartItems);
  };

  const placeOrder = async () => {
    try {
      const orderPayload = {
        orderItems: cartItem.map((item) => ({ productId: item.id, quantity: item.qty })),
        orderNumber: orderNumber,
      };

      //await axios.post(`${api}/order`, orderPayload);
      await axios.post(`http://localhost:4204/product_order/order`, orderPayload);
      toast.success("Order Placed Successfully");
      setCartItem([]);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Order</h2>
      <div className="cart-items">
        {cartItem.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            handleAdd={() => handleAdd(item.id)}
            handleReduce={() => handleReduce(item.id)}
            handleRemove={() => handleRemove(item.id)}
          />
        ))}

        {cartItem.length > 0 && (
          <>
            <div className="total">
              <h3>Total: {total}</h3>
            </div>
            <div className="order-number-input">
              <label htmlFor="orderNumber">Order Number:</label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <SubmitButton
              text="Place Order"
              className="place-order-button"
              onClick={placeOrder}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
