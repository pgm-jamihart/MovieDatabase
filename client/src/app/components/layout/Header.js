import styles from './Header.module.scss';
import { Link } from "react-router-dom";
import * as Routes from '../../routes';
import { useAuth } from '../../contexts/firebase/auth.context';

const Header = () => {
  const { currentUser } = useAuth();
  return (
    <header>

      {!!currentUser === true && 
        <Link to={Routes.ACCOUNT_DASHBOARD} className={styles.profile}>
          {currentUser.photoURL === null ?
            <img src="/account.png" alt={currentUser.displayName}/>
          :
            <img src={currentUser.photoURL} alt={currentUser.displayName}/>
          } 
        </Link>
      }
      
    </header>
  );
};

export default Header;
