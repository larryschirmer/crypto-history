import React, { FC } from 'react';

import Totals from '@components/Totals';
import Chart from '@components/Chart';

import styles from './Home.module.scss';

const { home: homeClass } = styles;

const Home: FC = () => {
  return (
    <div className={homeClass}>
      <Chart />
      <Totals />
    </div>
  );
};

export default Home;
