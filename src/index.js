// index.js
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import HomePage from "./Entrypage";
import "./App.css";
import SignUp from "./SignUp"; // Make sure the path is correct

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage onLogout={handleLogout} />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/app" /> : <Login onLogin={handleLogin} />} />
        <Route path="/app/*" element={isLoggedIn ? <App onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Root />);
