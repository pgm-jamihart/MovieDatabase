import React from 'react'
import styles from './SearchResultList.module.scss';
import { useLocation } from 'react-router-dom';
import MovieListItem from '../movies_and_tv/MovieListItem';
import TvShowListItem from '../movies_and_tv/TvShowListItem';

const SearchResults = () => {
  const keywordLocation = useLocation();
  const results = keywordLocation.state.results;
  const query = keywordLocation.state.query;
  const mediaType = keywordLocation.state.mediatype;

  return (
    <div>
      <h1>{query}</h1>
      <ul className={styles.searchResult__list}>
      {mediaType ==='movie' && results.map(result => {
        return (
          <MovieListItem key={result.id} {...result}/>
        )
      })}
      
      {mediaType ==='tv' && results.map(result => {
        return (
          <TvShowListItem key={result.id} {...result}/>
        )
      })}
      </ul>

    </div>
  )
}

export default SearchResults