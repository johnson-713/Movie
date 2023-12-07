import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./NewSeats.css";
import { useNavigate } from "react-router-dom";

const NewSeats = () => {
  const storedSeats = localStorage.getItem("selectedSeats");
  let initialValue;
  if (storedSeats === null) {
    initialValue = [];
  } else {
    initialValue = JSON.parse(storedSeats);
  }

  const [selectedSeats, setSelectedSeats] = useState(initialValue);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const handleSeatSelect = (selectedSeat) => {
    setSelectedSeats((seats) => {
      const seatIndex = seats.findIndex((seat) => seat.id === selectedSeat.id);

      if (seatIndex !== -1) {
        return [...seats.slice(0, seatIndex), ...seats.slice(seatIndex + 1)];
      } else {
        return [...seats, selectedSeat];
      }
    });
  };

  useEffect(() => {
    const storedMovie = localStorage.getItem("selectedMovie");
    const storedScreen = localStorage.getItem("selectedScreen");
    const storedTheatre = localStorage.getItem("selectedTheatre");
   
    if (storedMovie) {
      setSelectedMovie(JSON.parse(storedMovie));
    }

    if (storedScreen) {
      setSelectedScreen(JSON.parse(storedScreen));
    }
    if (storedTheatre) {
      setSelectedTheatre(JSON.parse(storedTheatre));
    }
  }, []);


  const handleBook = () => {
    navigate("/message");
  };

  return (
    <div className="seatsPage">
      <div className="seatsPage__sidebar">
        <Sidebar />
      </div>
      <div className="seatsPage__main">
        <div className="seatsPage__seatGrid">
          {selectedScreen && selectedScreen.seats && (
            <div key={selectedScreen.id} className="seats__btns">
              {selectedScreen.seats.map((row) => (
                <div key={row.id}>
                  {row && Object.entries(row).map(([rowName, seatGroup]) => (
                    <div key={seatGroup.id}>
                      {seatGroup.seat.map((s) => (
                        <button
                          key={s.id}
                          className={`seat ${
                            selectedSeats.some((sc) => sc.id === s.id)
                              ? "selected"
                              : ""
                          }`}
                          id={s.id}
                          disabled={s.booked}
                          onClick={() => {
                            if (!s.booked) {
                              handleSeatSelect(s);
                            }
                          }}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="booking__summary">
          <div>
            {selectedScreen && selectedMovie && (
              <div className="selected__screen">
                <p>Theatre: {selectedTheatre.name}</p>
                <p>Time: {selectedScreen.time}</p>
                <p>Movie: {selectedMovie.title}</p>
              </div>
            )}
          </div>
          <div>
            {selectedSeats?.length > 0 && (
              <div className="selected__seats">
                <p>
                  Selected seats:{" "}
                  {selectedSeats
                    .map((selectedSeat) => selectedSeat.name)
                    .join(", ")}
                </p>
                <p>
                  Price:{" "}
                  {selectedSeats.reduce(
                    (acc, seat) => acc + ((seat.price* seat.percentage) || 0),
                    0
                  )}
                </p>
                <p>Total Seats: {selectedSeats.length}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleBook}
            disabled={!selectedScreen || selectedSeats.length === 0}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSeats;
