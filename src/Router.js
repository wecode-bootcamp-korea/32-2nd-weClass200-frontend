import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Main from "./pages/Main/Main";
import Auth from "./pages/Auth/Auth";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductList from "./pages/ProductList/ProductList";
import Payment from "./pages/Payment/Payment";
import LogIn from "./pages/User/LogIn/LogIn";
import SignUp from "./pages/User/SignUp/SignUp";
import Creator from "./pages/Creator/Creator";
import Mypage from "./pages/Mypage/Mypage";

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/kakaoauth" element={<Auth />} />
        <Route path="/" element={<Main />} />
        <Route path="/products/public" element={<ProductList />} />
        <Route path="/products/private" element={<ProductList />} />
        <Route path="/products/public/:id" element={<ProductDetail />} />
        <Route path="/products/private/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
