
import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

 function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null)
  async function fetchMovies () {
    setIsLoading(true)
    setIsError(null)
    try{
    const response = await fetch('https://swapi.dev/api/films/admin');
    if(!response.ok){
      throw new Error('something went wrong!')
    }
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
  }catch (error){
    setIsError(error.message);
  }
  setIsLoading(false);
};

  let msg ;
  
  if(isError){
    msg = <p>{isError}</p>
  }
  if(isLoading){
    msg = <p>Loading...</p>
  }
  
  if(movies.length > 0){
   msg = <MoviesList movies={movies}/>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {msg}
      </section>
    </React.Fragment>
  );
}

export default App;
