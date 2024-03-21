import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/Register/SignUpForm";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  const { user } = useAuthContext();

  const element = document.documentElement;

  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar />
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
