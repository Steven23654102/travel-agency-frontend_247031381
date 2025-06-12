// src/pages/Dashboard.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("請先登入");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="form-container">
      <h2>員工管理後台</h2>
      <p>這裡是登入員工才能看到的管理頁面。</p>
    </div>
  );
}
