import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHotels, Hotel } from "../api/hotels";

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    getHotels().then(setHotels);
  }, []);

  return (
    <div>
      <h2>所有飯店</h2>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.id}>
            <Link to={`/hotels/${hotel.id}`}>{hotel.name}</Link> - {hotel.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
