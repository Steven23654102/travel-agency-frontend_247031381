import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentForm from "./pages/AppointmentForm";
import AppointmentList from "./pages/AppointmentList";    // ★ 新增

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppointmentForm />} />
        <Route path="/appointments" element={<AppointmentList />} />  {/* ★ */}
      </Routes>
    </Router>
  );
}

export default App;
