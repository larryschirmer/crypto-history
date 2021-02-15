import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { operations } from '@redux/market';
import { RootState } from '@redux/index';

import styles from './Nav.module.scss';

const { fetchMarket } = operations;

const { nav: navClass, logo: logoClass, controls: controlsClass } = styles;

const Nav: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { portfolio } = useSelector(({ portfolio }: RootState) => ({
    portfolio: portfolio.data,
  }));

  const isOpenSettings = router.asPath.includes('settings');
  const handleToggleSettings = () => {
    if (isOpenSettings) router.push('/');
    else router.push('/settings');
  };

  const handleUpdateMarketData = () => {
    const tokenIds = portfolio.map(({ name }) => name);
    dispatch(fetchMarket(tokenIds));
  };

  return (
    <div className={navClass}>
      <div className={logoClass}>Token Charts</div>
      <div className={controlsClass}>
        <button onClick={handleUpdateMarketData}>Update</button>
        <button onClick={handleToggleSettings}>{isOpenSettings ? 'Close' : 'Settings'}</button>
      </div>
    </div>
  );
};

export default Nav;
