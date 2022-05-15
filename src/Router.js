import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Main from "./pages/Main/Main";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductList from "./pages/ProductList/ProductList";
import Recommend from "./pages/Recommend/Recommend";
import LogIn from "./pages/User/LogIn/LogIn";
import SignUp from "./pages/User/SignUp/SignUp";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recommend" element={<Recommend />} />
        <Route element={<Nav />}>
          <Route path="/" element={<Main />} />
          <Route path="/products:id" element={<ProductList />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
