import React from 'react';
import styles from './NotFound.module.scss';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено...
      </h1>
      <p>К сожелению данная страница отсутствует в нашем блоге</p>
    </div>
  );
};
