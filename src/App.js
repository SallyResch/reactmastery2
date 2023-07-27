import React, { useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
//Here is your movies API key: b9a2a929
const API_URL = 'https://www.omdbapi.com?apikey=b9a2a929';
//To use the API we have to use a useEffect hook

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //fetching of API objects
  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="app">
      <h1>Sallys MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
    </div>
  )
}
export default App;