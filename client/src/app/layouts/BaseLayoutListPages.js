import { Header, MainNavigation, Hero } from '../components/layout';
import styles from './BaseLayoutListPages.module.scss';

const BaseLayoutListPages = ({children}) => {
  return (
    <>
      <Header />
      <MainNavigation />
      <main className={styles.main}>
        <Hero />
        { children }
      </main> 
    </>
  )
};

export default BaseLayoutListPages;