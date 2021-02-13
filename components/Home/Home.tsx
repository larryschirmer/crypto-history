import React from 'react';

import styles from './Home.module.scss';

const {
  home: homeClass,
  'chart-placeholder': chartPlaceholderClass,
  'brush-placeholder': brushPlaceholderClass,
} = styles;

const Home = () => {
  return (
    <div className={homeClass}>
      <div className={chartPlaceholderClass}></div>
      <div className={brushPlaceholderClass}></div>
    </div>
  );
};

export default Home;
