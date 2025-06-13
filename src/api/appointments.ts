// src/api/appointments.ts
export interface Appointment {
  id: number;
  name_en: string;
  name_zh?: string;
  gender?: string;
  dob?: string;
  address?: string;
  hkid?: string;
  phone?: string;
  email: string;
  date?: string;
  time?: string;
  location?: string;
}

export async function createAppointment(data: Appointment) {
  const response = await fetch("http://localhost:3000/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create appointment");
  }

  return await response.json();
}

export async function getAppointments() {
  const res = await fetch("http://localhost:3000/api/appointments");
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

// src/api/appointments.ts
export async function deleteAppointment(id: number) {
  const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("刪除失敗");
}


