import React, { useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { Movies } from "./db/Data";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const navigate = useNavigate();
  const [showAllMovies, setShowAllMovies] = useState(false)
  const [input, setInput] = useState("")

  const handleClick = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/theatres");
  };

  const handleViewAll = () => {
    setShowAllMovies(true)
  }

  const handleSearch = (event) => {
    setInput(event.target.value)
  }

  const filteredMovies = Movies.filter((movie) => 
    movie.title.toLowerCase().startsWith(input.toLowerCase()))

  return (
    <div className="movieList">
      <div className="movieList__nav">
        <div className="movieList__nav--description">
          <p id="tag">Casablanca</p>
          <h3>Movies</h3>
          <p id="desc">Join the crowd, love the movie</p>
        </div>
        <div className="movieList__nav--search">
          <input type="text" placeholder="Search" onChange={handleSearch} />
        </div>
        <button className="movieList__nav--btns" onClick={handleViewAll}>View all</button>
      </div>
      <div className="movieList__selection">
        {filteredMovies.map((movie) => (
          <div
            className="movie"
            key={movie.id}
            onClick={() => handleClick(movie)}
          >
            <MovieCard
              image={movie.image}
              title={movie.title}
              language={movie.language}
              id={movie.id}
              price={movie.price}
            />
          </div>
        )).slice(0, showAllMovies ? Movies.length : 4)}
      </div>
    </div>
  );
};

export default MovieList;
