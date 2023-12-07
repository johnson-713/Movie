import React, { useEffect, useState } from "react";
import "./BookingModal.css";
import { useNavigate } from "react-router-dom";

const BookingModal = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState(null)
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedMovie = localStorage.getItem("selectedMovie");
    const storedScreen = localStorage.getItem("selectedScreen");
    const storedSeats = localStorage.getItem("selectedSeats");
    const storedTheatre = localStorage.getItem('selectedTheatre')
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedSeats) {
      setSelectedSeats(storedSeats);
    }
    if (storedMovie) {
      setSelectedMovie(storedMovie);
    }

    if (storedScreen) {
      setSelectedScreen(storedScreen);
    }
    if(storedTheatre){
      setSelectedTheatre(storedTheatre)
    }
  }, []);

  useEffect(() => {
    const delayTime = 5000;

    const timeoutId = setTimeout(() => {
      localStorage.removeItem("selectedScreen");
      localStorage.removeItem("selectedMovie");
      localStorage.removeItem("selectedSeats");
      localStorage.removeItem('selectedTheatre')
      navigate("/movies");
    }, delayTime);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  const movieName = selectedMovie ? JSON.parse(selectedMovie).title : "";
  const theatre = selectedTheatre ? JSON.parse(selectedTheatre).name : ""
  const screenTime = selectedScreen ? JSON.parse(selectedScreen).time : "";
  const price = selectedMovie ? JSON.parse(selectedMovie).price : "";
  const seats = selectedSeats ? JSON.parse(selectedSeats).length : "";
  const numbers = selectedSeats
    ? JSON.parse(selectedSeats)
        .map((seat) => seat.name)
        .join(", ")
    : "";

  return (
    <div className="modal__content">
      <div className="modal__content--contents">
      <h3>Hi, {user}</h3>
      <div className="modal__title">
        <p>Movie: {movieName}</p>
        <p>Show Time: {screenTime}</p>
      </div>
      <div>
      <p>Theatre: {theatre}</p>
      </div>
      <div className="modal__seats">
        <p>Price: {seats * price}</p>
        <p>Seats No: {numbers}</p>
      </div>
      <div>
        <p>Total Seats: {seats}</p>
      </div>
      <h3>Successfully booked!</h3>
      <p> Booking information will be sent to your email.</p>
      </div>
    </div>
  );
};

export default BookingModal;
