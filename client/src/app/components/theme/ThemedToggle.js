import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import styles from './ThemedToggle.module.scss';

const ThemedToggle = () => {
  const {theme, setTheme} = useContext(ThemeContext);

  const handleThemeToggle = (e) => {
    e.preventDefault();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className={styles.flexContainer}>
      <input onClick={handleThemeToggle} type="checkbox" id="checkbox" className={styles.themeToggle} />
      
      <label className={styles.label} htmlFor="checkbox">
        <div className={`${styles.label__ball} ${theme === 'dark' ? `${styles.label__ball__dark}` : `${styles.label__ball__light}`}`}></div>
      </label>

      <span className={styles.mobile_hide}>Dark mode</span>
    </div>
  )
}

export default ThemedToggle
