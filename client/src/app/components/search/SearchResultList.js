import React from 'react'
import MovieListItem from '../movies_and_tv/MovieListItem';
import TvShowListItem from '../movies_and_tv/TvShowListItem';
import styles from './SearchResultList.module.scss';
import SearchFilter from './SearchFilter';

const SearchResults = ({searchQuery, searchResults, setSearchType, searchType }) => {
  console.log(searchType)
  return (
    <div>
      <h1 className={styles.searchQuery}>{searchQuery}</h1>
      <SearchFilter setSearchType={setSearchType}/>
      <ul className={styles.searchResult__list}>
      {searchType === 'movie' && searchResults.map(result => {
        return (
          <MovieListItem key={result.id} {...result}/>
        )
      })}

      {searchType === 'tv' && searchResults.map(result => {
        return (
          <TvShowListItem key={result.id} {...result}/>
        )
      })}
      </ul>

    </div>
  )
}

export default SearchResults