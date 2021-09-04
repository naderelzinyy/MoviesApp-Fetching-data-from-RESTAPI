
import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

 function App() {
  const [movies, setMovies] = useState([]);
  async function fetchMovies () {

    const response = await fetch('https://swapi.dev/api/films');
    const data = await response.json();
    
      const transformedData = data.results.map(moviesData => {
        return{
          id: moviesData.episode_id,
          title: moviesData.title,
          releaseDate: moviesData.releaseDate,
          openingText: moviesData.opening_crawl
        }
      })
        setMovies(transformedData);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
