import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '@redux/index';
import { operations } from '@redux/portfolio';

import styles from './Settings.module.scss';

const { removeToken } = operations;

const {
  settings: settingsClass,
  header: headerClass,
  portfolio: portfolioClass,
  'portfolio-item': portfolioItemClass,
  'item-details': itemDetailsClass,
  'item-controls': itemControlsClass,
} = styles;

const Settings: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { portfolio } = useSelector(({ portfolio }: RootState) => ({
    portfolio: portfolio.data,
  }));

  const handleEditItem = (name: string) => {
    router.push({
      pathname: '/settings/[id]',
      query: { id: name },
    });
  };

  const handleDeleteItem = (name: string) => {
    dispatch(removeToken(name));
  };

  return (
    <div className={settingsClass}>
      <div className={headerClass}>
        <h1>Portfolio</h1>
        <button onClick={() => handleEditItem('new')}>Add</button>
      </div>
      <div className={portfolioClass}>
        {portfolio.map(({ name, amount }) => (
          <div key={name} className={portfolioItemClass}>
            <div className={itemDetailsClass}>
              <h1>{name}</h1>
              <p>: {amount}</p>
            </div>
            <div className={itemControlsClass}>
              <button onClick={() => handleEditItem(name)}>Edit</button>
              <button onClick={() => handleDeleteItem(name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
