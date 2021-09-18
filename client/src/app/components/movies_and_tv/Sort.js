import React from 'react';
import styles from './Sort.module.scss';

const Sort = ({type, setType}) => {
  return (
    <div className={styles.filter}>
      <h2>Sort</h2>

      <select
        value={type}
        onChange={(e) => {
          const selectedType=e.target.value;
          setType(selectedType)
        }}>
        <option defaultValue value="popular">Popular</option>
        <option value="top_rated">Top Rated</option>
      </select>

    </div>
  )
}

export default Sort
