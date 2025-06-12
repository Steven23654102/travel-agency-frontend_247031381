import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password });
      alert("註冊成功，請登入");
      navigate("/login");
    } catch (err) {
      alert("註冊失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">註冊</button>
    </form>
  );
}
