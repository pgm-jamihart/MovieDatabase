import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from './MovieListItem.module.scss';
import * as Routes from '../../routes';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const MovieListItem = ({ title, poster_path, vote_average, id }) => {
  return (
    <li className={styles.movie} data-testid="MovieListItem" >
      <Link to={Routes.MOVIE_DETAILPAGE.replace(':id', id)}>
        {poster_path === null ?
          <img src="/fallback.jpg" alt={title} />
        :
          <img data-testid="MovieListItemImage" src={IMG_API + poster_path} alt={title} />
        }

        <div className={styles.movie__info}>
          <div className={styles.movie__info__container}>
            <button className={styles.watchlist}><BsPlusCircle className={styles.watchlist__icon}/></button>
            <span>{vote_average}</span>
          </div>
          
          <span className={styles.movie__info__title}>{title}</span>
        </div>
      </Link>
    </li>
  )
};

export default MovieListItem;
