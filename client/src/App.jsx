import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/Register/SignUpForm";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import SentRequests from "./components/Profile/SentRequests";
import Rent from "./components/Rent/RentCar";
import Aos from "aos";
import "aos/dist/aos.css";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  const { user } = useAuthContext();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div>
          {user && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginForm /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUpForm /> : <Navigate to="/" />}
            />
            <Route
              path="/rent"
              element={user ? <Rent /> : <Navigate to="/login" />}
            />
            <Route
              path="/about"
              element={user ? <Rent /> : <Navigate to="/login" />}
            />
            <Route
              path="/sent-requests"
              element={user ? <SentRequests /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
