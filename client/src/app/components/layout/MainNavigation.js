import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { BiSlideshow, BiCameraMovie, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as Routes from '../../routes';
import { useAuth } from '../../contexts/firebase/auth.context';
import { useContext } from 'react'
import styles from './MainNavigation.module.scss';
import { ThemeContext } from '../../contexts/theme';
import { ThemedToggle } from '../theme';

const MainNavigation = () => {
  const {currentUser, signOut} = useAuth();
  const {theme} = useContext(ThemeContext);

  return (
    <nav className={`${styles.nav} ${theme === 'dark' ? `${styles.nav__dark}` : `${styles.nav__light}`}`}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__list__item}>
          <img className={styles.logo} src="/logo.png" alt="The movie database"/>
        </li>

        <li>
          <Link to={Routes.LANDING} className={styles.nav__list__link}>
            <AiOutlineHome className={styles.nav__icons}/>
            <span className={styles.mobile_hide}>Home</span>
          </Link>
        </li>

        <li>
          <Link to={Routes.TVSHOWS} className={styles.nav__list__link}>
            <BiSlideshow className={styles.nav__icons}/>
            <span className={styles.mobile_hide}>TV Shows</span>
          </Link>
        </li>

        <li>
          <Link to={Routes.MOVIES} className={styles.nav__list__link}>
            <BiCameraMovie className={styles.nav__icons}/>
            <span className={styles.mobile_hide}>Movies</span>
          </Link>
        </li>

        <li>
          <Link to={Routes.SEARCHRESULTS} className={styles.nav__list__link}>
            <BiSearch className={styles.nav__icons}/>
            <span className={styles.mobile_hide}>Search</span>
          </Link>
        </li>
      </ul>

      <div>
        <ThemedToggle />

        {!!currentUser
        ?    
        <button onClick={signOut} className={styles.auth}>
          <AiOutlineLogout className={styles.auth__icon}/>
          <span className={styles.mobile_hide}>Logout</span>
        </button>
        : 
        <Link to={Routes.AUTH_SIGN_IN} className={styles.auth}>
          <AiOutlineLogin className={styles.auth__icon}/>  
          <span className={styles.mobile_hide}>Sign In</span>
        </Link>
        }    
      </div>
    </nav>
  );
};

export default MainNavigation;