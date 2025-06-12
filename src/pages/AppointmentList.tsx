import React, { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";

export default function AppointmentList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAppointments()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>English Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Time</th>
          {/*  需要的欄位再加 */}
        </tr>
      </thead>
      <tbody>
        {data.map((a, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{a.name_en}</td>
            <td>{a.email}</td>
            <td>{a.date}</td>
            <td>{a.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
