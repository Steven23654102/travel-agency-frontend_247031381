import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentForm from "./pages/AppointmentForm";
import AppointmentList from "./pages/AppointmentList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppointmentForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
