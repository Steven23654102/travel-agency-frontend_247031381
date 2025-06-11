// src/pages/AppointmentForm.tsx
import React, { useState } from "react";
import { createAppointment } from "../api/appointments";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name_en: "",
    email: "",
    // 其他欄位...
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createAppointment(formData);
      alert("預約成功：" + JSON.stringify(res));
    } catch (err) {
      alert("預約失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="English Name"
        value={formData.name_en}
        onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {/* 其他欄位… */}
      <button type="submit">提交預約</button>
    </form>
  );
}
