import styles from './DetailInfo.module.scss';
import * as Routes from '../../routes';
import { Redirect } from "react-router-dom";
import { appConfig } from '../../config';
import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Button from '../Button/Button';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';
const KEYWORD_API = `https://api.themoviedb.org/3/`;
const KEYWORD_MOVIES_API = `https://api.themoviedb.org/3/discover/`

const DetailInfo = ({title, vote_average, poster_path, overview, genres, id, reviewScore, watchlist, mediaType, name }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [keyword_id, setKeyword_id] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, isLoading, error] = useFetch(KEYWORD_API + `${mediaType}/${id}/keywords?api_key=${appConfig.tmdb_key}`);

  const getKeywordsSearchResults = async () => {
      if (keyword_id) {
        const response = await fetch(`${KEYWORD_MOVIES_API}${mediaType}?api_key=${appConfig.tmdb_key}&with_keywords=${keyword_id}`);
        if (!response.ok) {
          console.error('Something wrong with api link');
        }
        const resultsData = await response.json();
        setSearchResults(resultsData.results)
      }
  }

  const detailGenres = genres.map(genre => {
    return <li key={genre.id}>{genre.name}</li>
  })

  const handleOnClick = (e) => {  
    e.preventDefault();
    setKeyword_id(e.target.id);
    setSearchQuery(e.target.dataset.id);
    getKeywordsSearchResults();
  }

  return (
      <section className={styles.info} data-testid="DetailInfo">
        <h1>{name || title}</h1>
        
        <div className={styles.scores}>
          <span>{vote_average} Rating</span>
          <span>{reviewScore}</span>
          <Button type="secondary">{watchlist}</Button>
        </div>
       
        <div className={styles.info_flex}>
          <img data-testid="DetailInfoImage" src={IMG_API + poster_path} alt={title}/> 

          <div className={styles.description}>
            <h2>Description</h2>
            <p>{overview}</p>

            <div>
              <h3>Genres</h3>
              <ul>{detailGenres}</ul>
            </div>

            {
              error ? <div>{error.message}</div> :
              isLoading || !data ? <div>Loading</div> :
              <>
                <h3>Keywords</h3>
                <ul className={styles.keywords_list}>
                {!!data.keywords && data.keywords.map(keyword => {
                  return (
                    <li key={keyword.id} className={styles.keywords_list_item}>
                      <button className={styles.small} data-id={keyword.name} id={keyword.id} onClick={(ev) => handleOnClick(ev)}>{keyword.name}</button>
                    </li>
                  )
                })}

                {!!data.results && data.results.map(keyword => {
                  return (
                    <li key={keyword.id} className={styles.keywords_list_item}>
                      <button className={styles.small} data-id={keyword.name} id={keyword.id} onClick={(ev) => handleOnClick(ev)}>{keyword.name}</button>
                    </li>
                  )
                })}
                </ul>
              </> 
            }

            {searchResults.length !== 0 &&
              <Redirect to={{
                pathname: Routes.KEYWORDSEARCHRESULTS,
                state: { 
                  results: searchResults,
                  query: searchQuery,
                  mediatype: mediaType,
                }
              }} />
            }

          </div>
        </div>
      </section>
  )
}

export default DetailInfo


