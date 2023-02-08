import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieSearchList from "./components/MovieSearchList";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourite from "./components/RemoveFavourite";
function App() {
  const [movies, setMovies] = useState([]);
  const [location, setLocation] = useState("scarface");
  const [favourites, setFavourites] = useState([]);
  const getMovie = async () => {
    const movi = await axios.get(
      `https://www.omdbapi.com/?s=${location}&apikey=2c76dd64`
    );
    setMovies(movi.data.Search);
  };

  const keyPress = (event) => {
    if (event.key === "Enter") {
      getMovie();
    }
  };
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    
    if (favourites.length > 0) {
      for (let i = 0; i < favourites.length; i++) {
        // console.log(movie.imdbID,favourites[i].imdbID);
        if ( movie.imdbID == favourites[i].imdbID) {
          
          setFavourites(newFavouriteList);
          saveLocalStorage(newFavouriteList);
        }
        else{
          console.log(false)
        }
      }
    } 
    else {
      setFavourites(newFavouriteList);
      saveLocalStorage(newFavouriteList);
    }
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveLocalStorage(newFavouriteList);
  };

  const saveLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  useEffect(() => {
    try {
      getMovie();
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    setFavourites(movieFavourites);
  }, []);
  return (
    <>
      <div className="container">
        <div className="search">
          <MovieSearchList heading="All Movies" />
          <SearchBox setLocation={setLocation} keyPress={keyPress} />
        </div>

        <div className="all-movie-list">
          <MovieList
            movies={movies}
            handleFavouriteMovie={addFavouriteMovie}
            favouriteComponent={AddFavourite}
          />
        </div>

        <div className="favourites-list">
          <MovieSearchList heading="Favourites" />
          <MovieList
            movies={favourites}
            favouriteComponent={RemoveFavourite}
            handleFavouriteMovie={removeFavouriteMovie}
          />
        </div>
      </div>
    </>
  );
}

export default App;
