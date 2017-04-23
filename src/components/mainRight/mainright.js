import React from 'react';
import styles from './mainright.css';

function MainRight({ children }) {
  return (
    <div className={styles.normal}>
      {children}
    </div>
  );
}

export default MainRight;
