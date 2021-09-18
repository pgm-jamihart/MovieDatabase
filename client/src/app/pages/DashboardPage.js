import React, {useState, useEffect} from 'react';
import { BaseLayout } from '../layouts';
import { useAuth, useFirestore } from '../contexts/firebase'
import { AccountWatchlist } from '../components/account';
import { Link } from 'react-router-dom';
import { ACCOUNT_PROFILE } from '../routes';
import { Helmet } from 'react-helmet';

import styles from './DashboardPage.module.scss';

const DashboardPage = () => {
  const [watchlistWatched, setWatchlistWatched] = useState(false);
  const [watchlistToWatch, setWatchlistToWatch] = useState(false);
  
  const { getUserWatchlist } = useFirestore(); 
  const {currentUser} = useAuth();

  useEffect(() => {
    fetchDataWatchlist();
    // eslint-disable-next-line
  }, []);

  const fetchDataWatchlist = async () => {
    const userId = currentUser.uid;
    const data = await getUserWatchlist(userId);
    const watched = data.filter(w => { 
      return w.watched === true
    })
    const toWatch = data.filter(t => {
      return t.watched === false
    })
    setWatchlistWatched(watched); 
    setWatchlistToWatch(toWatch);  
  };

  return (
    <BaseLayout>
      <Helmet>
        <title>Dashboard | Movie db</title>
        <meta 
          name='description'
          content='Save your favorite movies and/or tv shows in the'
        />
      </Helmet>

      <div className={styles.nav}>
        <h1>Dashboard</h1>
        <Link to={ACCOUNT_PROFILE}><span>Profile</span></Link>
      </div>
      <AccountWatchlist watched={watchlistWatched} toWatch={watchlistToWatch} />

    </BaseLayout>
  )
}

export default DashboardPage
