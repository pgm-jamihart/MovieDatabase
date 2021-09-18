import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountWatchlist.module.scss';
import * as Routes from '../../routes';

const AccountWatchlist = ({ watched, toWatch }) => (
  <div>
    <h2>Watched</h2>

    {/* eslint-disable-next-line */}
    <ul className={styles.watchlist}>
    {/* eslint-disable-next-line */}
      {!!watched && watched.map((movie) => {
        if (movie.type === 'movie') {
          return (
            <li key={movie.uid}>
              <Link to={Routes.MOVIE_DETAILPAGE.replace(':id', movie.uid)}>
                <img src={movie.image} alt={movie.title} />
                <span>{movie.title}</span>
              </Link>
            </li>
          );
        } if (movie.type === 'tv') {
          return (
            <li key={movie.uid}>
              <Link to={Routes.TVSHOW_DETAILPAGE.replace(':id', movie.uid)}>
                <img src={movie.image} alt={movie.title} />
                <span>{movie.title}</span>
              </Link>
            </li>
          );
        }
      })}
    </ul>

    <h2>To Watch</h2>

    {/* eslint-disable-next-line */}
    <ul className={styles.watchlist}>
      {/* eslint-disable-next-line */}
      {!!toWatch && toWatch.map((movie) => {
        if (movie.type === 'movie') {
          return (
            <li key={movie.uid}>
              <Link to={Routes.MOVIE_DETAILPAGE.replace(':id', movie.uid)}>
                <img src={movie.image} alt={movie.title} />
                <span>{movie.title}</span>
              </Link>
            </li>
          );
        } if (movie.type === 'tv') {
          return (
            <li key={movie.uid}>
              <Link to={Routes.TVSHOW_DETAILPAGE.replace(':id', movie.uid)}>
                <img src={movie.image} alt={movie.title} />
                <span>{movie.title}</span>
              </Link>
            </li>
          );
        }
      })}
    </ul>

  </div>
);

export default AccountWatchlist;
