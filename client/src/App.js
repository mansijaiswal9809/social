import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/postdetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <GoogleOAuthProvider clientId="362554887217-k0bctu8qargkcb0fi7qj5tl6d4b84o8k.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Navigate to="/posts" />} />
            <Route exact path="/posts" element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              exact
              path="/auth"
              element={!user ? <Auth /> : <Navigate to="/" />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
// 362554887217-k0bctu8qargkcb0fi7qj5tl6d4b84o8k.apps.googleusercontent.com
export default App;


