import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentForm from "./pages/AppointmentForm";
import AppointmentList from "./pages/AppointmentList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import HotelCreate from "./pages/HotelCreate";
import HotelEdit from "./pages/HotelEdit";
import EditAppointment from "./pages/EditAppointment";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppointmentForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/hotels/new" element={<HotelCreate />} />
        <Route path="/hotels/:id/edit" element={<HotelEdit />} />
        <Route path="/appointments/:id/edit" element={<EditAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
