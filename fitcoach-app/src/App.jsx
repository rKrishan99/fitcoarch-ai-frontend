import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import UserDashbord from "./pages/userDashboard/UserDashbord";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import SignUp from "./components/signUp/SignUp";
import Footer from "./components/footer/Footer";
import Loader from "./components/Loader";
import SideBar from "./components/sideBar/SIdeBar";
import AOS from 'aos';
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import UserProfile from "./pages/userProfile/userProfile";


function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,      // Animation duration (ms)
      easing: 'ease-in-out', // Easing type
      once: true,        // Only animate once
      mirror: false, // Whether elements should animate out while scrolling past
    });
  }, []);

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Navbar />
      {/* <Login/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashbord />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>

      <Login />
      <SignUp />
      <SideBar/>
      <Loader />
      <Footer />
    </div>
  );
}

export default App;
