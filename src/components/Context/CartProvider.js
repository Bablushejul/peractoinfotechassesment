import React, { useEffect, useRef, useState } from "react";
import CartContext from "./CartContext";

async function getUserCart(emailID) {
  const modifiedEmail = emailID.replace(/[.@]/g, "");
  const response = await fetch(
    `https://product-8463e-default-rtdb.firebaseio.com/ecommerce/${modifiedEmail}/cart.json`
  );
  const result = await response.json();
  return result.orderList;
}

async function updateUserCart(emailID, data) {
  const modifiedEmail = emailID.replace(/[.@]/g, "");
  const response = await fetch(
    `https://product-8463e-default-rtdb.firebaseio.com/ecommerce/${modifiedEmail}/cart.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderList: data }),
    }
  );
  const result = await response.json();
  return result;
 }


const CartProvider = (props) => {
  const cartUpdateid = useRef("");
  const userIdToken = localStorage.getItem("idToken");
  const email = localStorage.getItem("email");
  const userLogedIn = !!userIdToken;
  const [cartVisibility, setCartVisibility] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [signInModalVisibility, setSignInModalVisibility] = useState(false);
  const [idToken, setIdToken] = useState(userIdToken);
  const [isLogedIn, setIsLogedIn] = useState(userLogedIn);
  const [userEmail, setUserEmail] = useState(email);
  

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productarr = [];

  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://dummyjson.com/products?qty=10';

    // Fetch data from the API
    fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    //console.log(data); // Log the data to the console
    setProducts(data.products);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

  }, [products,loading]);

 

  console.log(products)
  productarr.push(products)
  console.log(productarr[0])
  
  useEffect(() => {
    if (isLogedIn) {
      setTimeout(() => {
        localStorage.removeItem("idToken");
        localStorage.removeItem("email");
      }, 5 * 60 * 1000);
      // return clearTimeout(timer);
    }
  }, [isLogedIn]);

  useEffect(() => {
    if (isLogedIn) {
      getUserCart(userEmail).then((data) => {
        setOrderList(data);
      });
    }
  }, [isLogedIn, userEmail]);

  useEffect(() => {
    if (orderList)
      if (isLogedIn && userEmail) {
        updateUserCart(userEmail, orderList).then((data) => console.log(data));
      }
  }, [orderList, userEmail, isLogedIn]);

  const ctxObj = {
    productsList: productarr[0],
    cartVisibility: cartVisibility,
    setCartVisibility: setCartVisibility,
    orderList: orderList,
    setOrderList: setOrderList,
    isLogedIn: isLogedIn,
    setIsLogedIn: setIsLogedIn,
    idToken: idToken,
    setIdToken: setIdToken,
    signInModalVisibility: signInModalVisibility,
    setSignInModalVisibility: setSignInModalVisibility,
    userEmail: userEmail,
    setUserEmail: setUserEmail,
    cartUpdateid: cartUpdateid.current,
  };
  return (
    <CartContext.Provider value={ctxObj}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;