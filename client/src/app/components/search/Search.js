import styles from './Search.module.scss';
import { FiSearch } from 'react-icons/fi';

const Search = ({handleOnSubmit, handleOnChange, searchQuery}) => {
  return (
    <form onSubmit={(ev) => handleOnSubmit(ev)} className={styles.search}>
      <input type="search" placeholder="Search a movie or tv show..." value={searchQuery} onChange={handleOnChange}/>
      <button><FiSearch className={styles.searchIcon}/></button>
    </form>
  );
};

export default Search;