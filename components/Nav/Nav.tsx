import React from 'react';

import styles from './Nav.module.scss';

const { nav: navClass, logo: logoClass, controls: controlsClass } = styles;

const Nav = () => {
  return (
    <div className={navClass}>
      <div className={logoClass}>Token Charts</div>
      <div className={controlsClass}>
        <button onClick={() => {}}>Update</button>
        <button onClick={() => {}}>Settings</button>
      </div>
    </div>
  );
};

export default Nav;
