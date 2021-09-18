import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '../layouts';
import { ACCOUNT_DASHBOARD } from '../routes';
import { useAuth, useFirestore } from '../contexts/firebase';
import { Helmet } from 'react-helmet';
import styles from './ProfilePage.module.scss';
import Button from '../components/Button/Button';

const ProfilePage = () => {
  const { getProfileById } = useFirestore(); 
  const {currentUser} = useAuth();

  const [profile, setProfile] = useState('');

  useEffect(() => {
    fetchDataProfile();

    // eslint-disable-next-line
  }, []);

  const fetchDataProfile = async () => {
    const userId = currentUser.uid;
    const data = await getProfileById(userId);
    setProfile(data)
  };

  return (
    <BaseLayout>
      <Helmet>
        <title>Profile | Movie db</title>
        <meta 
          name='description'
          content='Edit your profile'
        />
      </Helmet>

      <div className={styles.nav}>
        <h1>Profile</h1>
        <Link to={ACCOUNT_DASHBOARD}><span>Dashboard</span></Link>
      </div>

      <div className={styles.content}>
        {!! profile.photoURL ?
          <img src={profile.photoURL} alt={profile.firstName + ' ' + profile.lastName} />
          :
          <Button type="primary">Add photo</Button>
        }

        {!!profile ?
          <ul>
            <li><span>Firstname</span> {profile.firstName}</li>
            <li><span>Lastname</span> {profile.lastName}</li>
            <li><span>Age</span> {profile.age}</li>
            <li><span>City</span> {profile.city}</li>
            <li><span>Country</span> {profile.country}</li>
            <li><span>Tel</span> {profile.tel}</li>
          </ul>
        :
          <Button type="secondary">Add profile info</Button>
        }
        
      </div>
    </BaseLayout>
  )
}

export default ProfilePage
