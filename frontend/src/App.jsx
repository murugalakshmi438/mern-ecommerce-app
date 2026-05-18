import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Address from "./pages/Address";
import Payment from "./pages/Payment";


import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";



function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>

      <Navbar search={search} setSearch={setSearch} />

      <Routes>

        <Route path="/" element={<Home search={search} />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<Orders />} />
         <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;