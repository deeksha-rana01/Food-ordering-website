import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import OrderPage from "./pages/OrderPage";

function App() {
   const [cart, setCart] = useState(
  JSON.parse(localStorage.getItem("cart"))
  || []
);
useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}, [cart]);
  return (
    <div>
      <Navbar cart={cart} />

      <Routes>
        <Route
  path="/"
  element={
    <HomePage
      cart={cart}
      setCart={setCart}
    />
  }
/>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />}/>
        
        <Route
  path="/cart"
  element={
    <CartPage
      cart={cart}
      setCart={setCart}
    />
  }
/>
<Route
  path="/orders"
  element={<OrderPage />}
/>
      </Routes>
    </div>
  );
}

export default App;