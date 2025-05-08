import React from "react";
import Navbar from "./components/navbar/Navbar";
import UserDashbord from "./pages/userDashboard/UserDashbord";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import SignUp from "./components/signUp/SignUp";

function App() {
  return (
    <div>
      <Navbar />
      {/* <Login/> */}
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashbord />} />
      </Routes>

      <Login/>
      <SignUp/>
    </div>
  );
}

export default App;
