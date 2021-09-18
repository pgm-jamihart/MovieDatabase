import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from './MovieListItem.module.scss';
import * as Routes from '../../routes';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const TvShowListItem = ({ name, poster_path, vote_average, id }) => {
  return (
    <li className={styles.movie}>
      <Link to={Routes.TVSHOW_DETAILPAGE.replace(':id', id)}>
        {poster_path === null ?
          <img src="/fallback.jpg" alt={name} />
        :
          <img src={IMG_API + poster_path} alt={name} />
        }

        <div className={styles.movie__info}>
          <div className={styles.movie__info__container}>
            <button className={styles.watchlist}><BsPlusCircle className={styles.watchlist__icon}/></button>
            <span>{vote_average}</span>
          </div>
          
          <span className={styles.movie__info__title}>{name}</span>
        </div>
      </Link>
    </li>
  )
};

export default TvShowListItem;
