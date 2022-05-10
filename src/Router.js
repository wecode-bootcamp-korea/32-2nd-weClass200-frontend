import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Main from "./pages/Main/Main";
import Auth from "./pages/Auth/Auth";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductList from "./pages/ProductList/ProductList";
import LogIn from "./pages/User/LogIn/LogIn";
import SignUp from "./pages/User/SignUp/SignUp";
// import Payment from "./pages/User/Payment/Payment";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/kakaoauth" element={<Auth />} />
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/payment" element={<Payment />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Router;
