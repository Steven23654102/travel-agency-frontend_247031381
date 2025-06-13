// src/pages/HotelEdit.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Hotel {
  id: number;
  name: string;
  city: string;
  description: string;
  image?: string;
}

export default function HotelEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState<Hotel | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("請先登入");
      navigate("/login");
      return;
    }

    axios.get(`/api/v1/hotels/${id}`).then((res) => {
        setForm(res.data as Hotel);
    });

  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/v1/hotels/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("編輯成功");
      navigate("/hotels");
    } catch {
      alert("編輯失敗");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("確定要刪除這間飯店嗎？")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/hotels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("刪除成功");
      navigate("/hotels");
    } catch {
      alert("刪除失敗");
    }
  };

  if (!form) return <p>載入中...</p>;

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>編輯飯店</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="名稱" />
      <input name="city" value={form.city} onChange={handleChange} placeholder="城市" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="描述" />
      <input name="image" value={form.image || ""} onChange={handleChange} placeholder="圖片網址" />
      <button type="submit">儲存變更</button>
      <button type="button" onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
        刪除
      </button>
    </form>
  );
}
