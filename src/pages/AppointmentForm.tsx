import React, { useState } from "react";
import { createAppointment } from "../api/appointments";
import "../App.css"; 
import { useNavigate } from "react-router-dom";


export default function AppointmentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_en: "",
    name_zh: "",
    gender: "",
    dob: "",
    address: "",
    hkid: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    location: "",
  });

const [errors, setErrors] = useState<{ phone?: string; hkid?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors: { phone?: string; hkid?: string } = {};

  if (!/^\d{8}$/.test(formData.phone)) {
    newErrors.phone = "電話必須是 8 位數字";
  }

  if (!/^[A-Z]\d{6}\(\d\)$/.test(formData.hkid)) {
    newErrors.hkid = "請輸入有效的 HKID 格式（如 A123456(7)）";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const res = await createAppointment(formData);
    alert("預約成功：" + JSON.stringify(res));
    navigate("/appointments");
  } catch (err) {
    alert("預約失敗");
  }
};



  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>English Name</label>
        <input
          type="text"
          value={formData.name_en}
          onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Chinese Name</label>
        <input
          type="text"
          value={formData.name_zh}
          onChange={(e) => setFormData({ ...formData, name_zh: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>HKID</label>
        <input
          type="text"
          value={formData.hkid}
          onChange={(e) => setFormData({ ...formData, hkid: e.target.value })}
        />
        {errors.hkid && <p style={{ color: "red" }}>{errors.hkid}</p>}
      </div>


      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      </div>


      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Appointment Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Appointment Time</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <div className="form-group">
        <button type="submit">提交預約</button>
      </div>
    </form>
  );
}
