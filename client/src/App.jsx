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
import ListCar from "./components/List/ListCar";
import ListYourCar from "./components/List/ListYourCar";
import Aos from "aos";
import "aos/dist/aos.css";
import ListCarDetails from "./components/List/ListCarDetails";
import ListCarSubmit from "./components/List/ListCarSubmit";
import DashboardRent from "./components/Dashboard/DashboardRent";
import RentCars from "./components/Rent/RentCars";
import EditCarDetails from "./components/Profile/EditCarDetails";
import AboutPage from "./components/Home/AboutPage";
import MyCars from "./components/Profile/MyCars";
import Chat from "./components/Chat/Chat";
import ReceivedRequests from "./components/Profile/ReceivedRequests";
import RenterDetails from "./components/Profile/RenterDetails/RenterDetails";
import Assistant from "./components/Assistant/Assistant";


const App = () => {
  const { user } = useAuthContext();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  if (user === undefined) return <div>Loading...</div>;

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
              path="/about"
              element={user ? <AboutPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/list"
              element={user ? <ListCar /> : <Navigate to="/login" />}
            />
            <Route
              path="/list-car-details"
              element={user ? <ListCarDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/list-your-car"
              element={user ? <ListYourCar /> : <Navigate to="/login" />}
            />
            <Route
              path="/rent"
              element={user ? <RentCars /> : <Navigate to="/login" />}
            />
            <Route
              path="/see-car/:id"
              element={user ? <DashboardRent /> : <Navigate to="/login" />}
            />
            <Route
              path="/list-car-submit"
              element={user ? <ListCarSubmit /> : <Navigate to="/login" />}
            />
            <Route
              path="/edit-car-details/:id"
              element={user ? <EditCarDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/my-cars"
              element={user ? <MyCars /> : <Navigate to="/login" />}
            />
            <Route
              path="/sent-requests"
              element={user ? <SentRequests /> : <Navigate to="/login" />}
            />
            <Route
              path="/received-requests"
              element={user ? <ReceivedRequests /> : <Navigate to="/login" />}
            />
            <Route
              path="/chat"
              element={user ? <Chat /> : <Navigate to="/login" />}
            />
           <Route
              path="/renter-details/:id"
              element={user ? <RenterDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/assistant"
              element={user ? <Assistant /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
