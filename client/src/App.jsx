import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LoginForm from "./components/Login/LoginForm";
//import registerBackground from "./assets/register.jpg";
import SignUpForm from "./components/Register/SignUpForm";
import { Routes, Route, BrowserRouter,Navigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard";
import { useAuthContext } from "./hooks/useAuthContext";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  // dark mode start
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const {user} = useAuthContext();

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
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route 
              path="/" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
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
