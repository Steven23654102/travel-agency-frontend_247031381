import axios from "axios";

export interface Hotel {
  id: number;
  name: string;
  city: string;
  description: string;
  image?: string;
}


export async function getHotels(): Promise<Hotel[]> {
  const res = await axios.get<Hotel[]>("/api/v1/hotels");
  return res.data;
}

export async function getHotelById(id: number): Promise<Hotel> {
  const res = await axios.get<Hotel>(`/api/v1/hotels/${id}`);
  return res.data;
}
