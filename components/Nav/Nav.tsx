import React, { FC } from 'react';
import { useRouter } from 'next/router';

import styles from './Nav.module.scss';

const { nav: navClass, logo: logoClass, controls: controlsClass } = styles;

const Nav: FC = () => {
  const router = useRouter();
  const isOpenSettings = router.asPath.includes('settings');
  const handleToggleSettings = () => {
    if (isOpenSettings) router.push('/');
    else router.push('/settings');
  };

  return (
    <div className={navClass}>
      <div className={logoClass}>Token Charts</div>
      <div className={controlsClass}>
        <button>Update</button>
        <button onClick={handleToggleSettings}>{isOpenSettings ? 'Close' : 'Settings'}</button>
      </div>
    </div>
  );
};

export default Nav;
