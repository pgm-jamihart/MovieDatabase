import React from 'react';
import { appConfig } from '../../config';
import useFetch from '../../hooks/useFetch';
import MovieListItem from '../movies_and_tv/MovieListItem';
import styles from './PopularMoviesList.module.scss'

const api = `https://api.themoviedb.org/3/movie/popular`;

const PopularMoviesList = () => {

  const [data, isLoading, error] = useFetch(api + `?api_key=${appConfig.tmdb_key}`);

  return (
    <div>
      <h2>Popular movies</h2>
      {
        error ? <div>{error.message}</div> :
        isLoading || !data ? 
          <div>Loading</div> :
          <ul className={styles.popular}>
            {!!data.results && data.results.map(movie => {
                return (
                  <MovieListItem key={movie.id} {...movie}/>
                )
              })}
          </ul>
      }
    </div>
  )
}

export default PopularMoviesList
