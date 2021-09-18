import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
  const { componentType = 'primary', ...rest} = props;

  return (
    <input data-testid="input" className={styles[componentType]} {...rest} />
  )
}

export default Input
