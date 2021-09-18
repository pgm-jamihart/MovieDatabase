import React from 'react';
import { appConfig } from '../../config';
import useFetch from '../../hooks/useFetch';
import TvShowListItem from '../movies_and_tv/TvShowListItem';
import styles from './TopRatedTvShowsList.module.scss';

const api = `https://api.themoviedb.org/3/tv/top_rated`;

const TopRatedTvShowsList = () => {

  const [data, isLoading, error] = useFetch(api + `?api_key=${appConfig.tmdb_key}`);

  return (
    <div>
      <h2>Top Rated Tv Shows</h2>
      {
        error ? <div>{error.message}</div> :
        isLoading || !data ? 
          <div>Loading</div> :
          <ul className={styles.top_rated}>
            {!!data.results && data.results.map(tvshow => {
                return (
                  <TvShowListItem key={tvshow.id} {...tvshow}/>
                )
              })}
          </ul>
      }
    </div>
  )
}

export default TopRatedTvShowsList
