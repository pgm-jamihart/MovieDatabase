import React from 'react';
import styles from './SearchFilter.module.scss';

const SearchFilter = ({setSearchType, searchType}) => {
  const handleOnChange = (e) => {
    const selectedType = e.target.value;
    setSearchType(selectedType);
  }

  return (
    <div className={styles.filter}>
      <h2>Filter</h2>

      <select
        value={searchType}
        onChange={handleOnChange}>
        <option defaultValue value="movie">Movies</option>
        <option value="tv">TV Shows</option>
      </select>
    </div>
  )
}

export default SearchFilter
