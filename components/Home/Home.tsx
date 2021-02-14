import React, { FC } from 'react';

import Nav from '@components/Nav';
import Totals from '@components/Totals';

import styles from './Home.module.scss';

const {
  home: homeClass,
  'chart-placeholder': chartPlaceholderClass,
  'brush-placeholder': brushPlaceholderClass,
} = styles;

const Home: FC = () => {
  return (
    <div className={homeClass}>
      <Nav />
      <div className={chartPlaceholderClass}></div>
      <div className={brushPlaceholderClass}></div>
      <Totals />
    </div>
  );
};

export default Home;
