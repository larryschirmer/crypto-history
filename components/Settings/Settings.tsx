import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '@redux/index';

import styles from './Settings.module.scss';

const {
  settings: settingsClass,
  header: headerClass,
  portfolio: portfolioClass,
  'portfolio-item': portfolioItemClass,
} = styles;

const Settings: FC = () => {
  const router = useRouter();
  const { portfolio } = useSelector(({ portfolio }: RootState) => ({
    portfolio: portfolio.data,
  }));

  const handleEditItem = (name: string) => {
    router.push({
      pathname: '/settings/[id]',
      query: { id: name },
    });
  };

  return (
    <div className={settingsClass}>
      <div className={headerClass}>
        <h1>Portfolio</h1>
        <button onClick={() => handleEditItem("new")}>Add</button>
      </div>
      <div className={portfolioClass}>
        {portfolio.map(({ name, amount }) => (
          <div key={name} className={portfolioItemClass}>
            <div>
              {name}: {amount}
            </div>
            <button onClick={() => handleEditItem(name)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
