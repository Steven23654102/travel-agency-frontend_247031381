import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../api/hotels";

interface Hotel {
  id: number;
  name: string;
  city: string;
  description: string;
  image?: string;
}

export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    if (id) getHotelById(Number(id)).then(setHotel);
  }, [id]);

  if (!hotel) return <p>載入中...</p>;

  return (
    <div>
      <h2>{hotel.name}</h2>
      <p>城市：{hotel.city}</p>
      <p>描述：{hotel.description}</p>
      {hotel.image && <img src={hotel.image} alt={hotel.name} style={{ width: "300px" }} />}
    </div>
  );
}
