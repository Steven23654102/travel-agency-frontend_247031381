// src/api/appointments.ts
export interface Appointment {
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

