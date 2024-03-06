import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LoginForm from "./components/Login/LoginForm";
//import registerBackground from "./assets/register.jpg";
import SignUpForm from "./components/Register/SignUpForm";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { UserContextProvider } from "../context/userContext";
import Dashboard from "./components/Dashboard/Dashboard";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  // dark mode start
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  // dark mode end

  return (
    <>
      <UserContextProvider>
        <Navbar theme={theme} setTheme={setTheme} />
        <Hero />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContextProvider>
    </>
  );
};
export default App;
