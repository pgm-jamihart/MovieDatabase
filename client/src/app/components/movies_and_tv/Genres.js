import { Chip } from '@material-ui/core';
import React, { useEffect } from 'react';
import { appConfig } from '../../config';
import styles from './Genres.module.scss';

const GENRE_API = `https://api.themoviedb.org/3/genre/`;

const Genres = ({ filteredGenres, setFilteredGenres, genres, setGenres, mediaType, setTotalPages }) => {

  const handleSelect = (genre) => {
    setFilteredGenres([...filteredGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setTotalPages(1);
  }

  const handleDelete = (genre) => {
    setFilteredGenres(filteredGenres.filter((s) => s.id !== genre.id));
    setGenres([...genres, genre]);
    setTotalPages(1);
  }

  const fetchGenres = async () => {
    const response = await fetch(GENRE_API + `${mediaType}/list?api_key=${appConfig.tmdb_key}`);
    if (!response.ok) {
      console.error('Something wrong with api link');
    }
    const genresData = await response.json();
    setGenres(genresData.genres)
  }

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({})
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.genres}>
      <h2>Genres</h2>
      {filteredGenres && filteredGenres.map(genre => {
        return (
          <Chip key={genre.id} label={genre.name} clickable color="secondary" variant="outlined" onDelete={()=> handleDelete(genre)} style={{ margin: 3 }}/>
        )
      })}

      {genres && genres.map(genre => {
        return (
          <Chip key={genre.id} label={genre.name} color="primary" clickable onClick={()=> handleSelect(genre)} style={{ margin: 3 }}/>
        )
      })}
    </div>
  )
}

export default Genres
