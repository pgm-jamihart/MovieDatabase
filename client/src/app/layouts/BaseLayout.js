import { Header, MainNavigation } from '../components/layout';

import styles from './BaseLayout.module.scss';

const BaseLayout = ({children}) => {
  return (
    <>
      <Header />
      <MainNavigation />
      <main className={styles.main}>
        { children }
      </main> 
    </>
  )
};

export default BaseLayout;