import React from 'react';

import Nav from '@components/Nav';

import styles from './Home.module.scss';

const {
  home: homeClass,
  'chart-placeholder': chartPlaceholderClass,
  'brush-placeholder': brushPlaceholderClass,
} = styles;

const Home = () => {
  return (
    <div className={homeClass}>
      <Nav />
      <div className={chartPlaceholderClass}></div>
      <div className={brushPlaceholderClass}></div>
    </div>
  );
};

export default Home;
