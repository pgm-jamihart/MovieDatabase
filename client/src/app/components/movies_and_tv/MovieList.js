import React, { useState, useEffect } from 'react';
import MovieListItem from './MovieListItem';
import styles from './MovieList.module.scss';
import { appConfig } from '../../config';
import { Pagination } from '../pagination';
import Genres from './Genres';
import useGenres from '../../hooks/useGenres';
import Sort from './Sort';

const api = `https://api.themoviedb.org/3/movie/`

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('popular');
  const [genres, setGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const genreApiLink = useGenres(filteredGenres);

  useEffect(() => {
    getMovies();

    // eslint-disable-next-line
  }, [pageNumber, type, genreApiLink]);

  const getMovies = async () => {
    try {
      const response = await fetch(api + `${type}?api_key=${appConfig.tmdb_key}&page=${pageNumber}&with_genres=${genreApiLink}`);
      
      if (!response.ok) {
        setError('Something wrong with api link');
      }

      const movies = await response.json();
      setMovies(movies.results);

      const npages = movies.total_pages;
      setTotalPages(npages);

    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Sort type={type} setType={setType}/>
      <Genres mediaType='movie' filteredGenres={filteredGenres} genres={genres} setGenres={setGenres} setFilteredGenres={setFilteredGenres} setTotalPages={setTotalPages}/>
      
      {
        error ? {error} :
        isLoading || !movies ? 
          <div>Loading</div> :
          <ul className={styles.movie__list}>
              {!!movies && movies.map(movie => {
                return (
                  <MovieListItem key={movie.id} {...movie}/>
                )
              })}
          </ul>
      }
      
      {totalPages > 1 && 
        <Pagination setPageNumber={setPageNumber} nPages={totalPages}/>
      }
    </div>
  )

};

export default MovieList;