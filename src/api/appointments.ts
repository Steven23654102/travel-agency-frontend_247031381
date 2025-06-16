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
  const response = await fetch("http://localhost:4000/api/appointments", {
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
  const res = await fetch("http://localhost:4000/api/appointments");
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

// src/api/appointments.ts
// src/api/appointments.ts
export async function deleteAppointment(id: number) {
  const res = await fetch(
    `http://localhost:4000/api/appointments/${id}`,  // ← 用反引號 & 正確主機
    { method: 'DELETE' }
  );
  if (!res.ok) throw new Error('刪除失敗');
}



export async function getAppointmentById(id: number) {
  const res = await fetch(`http://localhost:4000/api/appointments/${id}`);
  if (!res.ok) throw new Error("無法取得資料");
  return await res.json();
}


export async function updateAppointment(id: number, data: any) {
  const res = await fetch(`http://localhost:4000/api/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("更新失敗");
  return await res.json();
}
