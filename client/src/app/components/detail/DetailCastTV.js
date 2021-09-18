import { appConfig } from '../../config';
import useFetch from '../../hooks/useFetch';
import styles from './DetailCast.module.scss'

const CAST_API = `https://api.themoviedb.org/3/tv/`;
const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const DetailCast = ({id}) => {
  const [data, isLoading, error] = useFetch(CAST_API + `${id}/credits?api_key=${appConfig.tmdb_key}`)

  return (
    <div>
      <h2>Cast</h2>
      
      {
        error ? <div>{error.message}</div> :
        isLoading || !data.cast ? <div>Loading</div> :
        <ul className={styles.cast}>
        {!!data.cast && data.cast.map(person => {
          if (person.profile_path === null) {
            return (
              <li key={person.id}>
                <img src="/fallback.jpg" alt={person.name} />
                <span>{person.name}</span>
              </li>
            )
          } else {
            return (
              <li key={person.id}>
                <img src={IMG_API + person.profile_path} alt={person.name} />
                <span>{person.name}</span>
              </li>
            )
          }
        })}
        </ul>
      }

    </div>
  )
}

export default DetailCast
