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
import AOS from "aos";
import RequestModal from "./components/resetPassword/RequestModal";
import AddNewPassword from "./components/resetPassword/AddNewPassword";
import AskYesOrNot from "./components/resetPassword/AskYesOrNot";
import StartDashboard from "./components/startDashboard/StartDashboard";
import ChatButton from "./components/chatbot/ChatButton";
import UserProfile from "./pages/userProfile/UserProfile";
import Chat from "./components/chatbot/Chat";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration (ms)
      easing: "ease-in-out", // Easing type
      once: true, // Only animate once
      mirror: false, // Whether elements should animate out while scrolling past
    });
  }, []);

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashbord />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/reset-password" element={<AddNewPassword />} />
      </Routes>

      <Login />
      <SignUp />
      <SideBar />
      <Loader />
      <AskYesOrNot />
      <RequestModal />
      <ChatButton />
      <Chat />
      <Footer />
    </div>
  );
}

export default App;
