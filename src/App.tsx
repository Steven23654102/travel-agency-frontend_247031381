import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentForm from "./pages/AppointmentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
