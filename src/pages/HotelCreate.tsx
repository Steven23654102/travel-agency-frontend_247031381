import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HotelCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    city: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("請先登入");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/v1/hotels", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("新增成功！");
      navigate("/hotels");
    } catch (err) {
      alert("新增失敗");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>新增飯店</h2>

      <div className="form-group">
        <label>飯店名稱</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>城市</label>
        <input
          type="text"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>描述</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>圖片網址</label>
        <input
          type="text"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
      </div>

      <button type="submit">送出</button>
    </form>
  );
}
