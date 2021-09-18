import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
  const { type = 'primary', children } = props;
  return (
    <button data-testid="button" className={styles[type]}>
      {children}
    </button>
  )
}

export default Button
