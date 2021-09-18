import React, { useState, useEffect } from 'react';
import TvShowListItem from './TvShowListItem';
import styles from './TvShowList.module.scss';
import { appConfig } from '../../config';
import { Pagination } from '../pagination';
import Genres from './Genres';
import useGenres from '../../hooks/useGenres';
import Sort from './Sort';

const api = `https://api.themoviedb.org/3/tv/`

const TvShowList = () => {
  const [tvShow, setTvShow] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('popular');
  const [genres, setGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const genreApiLink = useGenres(filteredGenres);

  useEffect(() => {
    getTvShow();

    // eslint-disable-next-line
  }, [pageNumber, type, genreApiLink]);

  const getTvShow = async () => {
    try {
      const response = await fetch(api + `${type}?api_key=${appConfig.tmdb_key}&page=${pageNumber}&with_genres=${genreApiLink}`);
      
      if (!response.ok) {
        setError('Something wrong with api link');
      }

      const tv = await response.json();
      setTvShow(tv.results);

      const npages = tv.total_pages;
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
      <Genres mediaType='tv' filteredGenres={filteredGenres} genres={genres} setGenres={setGenres} setFilteredGenres={setFilteredGenres} setTotalPages={setTotalPages}/>
      {
        error ? {error} :
        isLoading || !tvShow ? 
          <div>Loading</div> :
          <ul className={styles.tv__list}>
              {!!tvShow && tvShow.map(tv => {
                return (
                  <TvShowListItem key={tv.id} {...tv}/>
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

export default TvShowList;