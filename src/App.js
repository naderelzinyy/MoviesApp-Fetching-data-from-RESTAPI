
import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

 function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  async function fetchMovies () {
    setIsLoading(true)

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
        setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading &&  <p>Loading...</p>}
        {!isLoading && <MoviesList movies={movies}/>}
      </section>
    </React.Fragment>
  );
}

export default App;
