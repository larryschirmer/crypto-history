import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';

import { RootState } from '@redux/index';
import { Snapshot } from '@redux/history/types';

import styles from './Totals.module.scss';

const {
  loading: loadingClass,
  totals: totalsClass,
  subtitle: subtitleClass,
  'token-list': tokenListClass,
  token: tokenClass,
  'token-details': tokenDetailsClass,
} = styles;

const Totals: FC = () => {
  const { history } = useSelector(({ history }: RootState) => ({
    history: history.data,
  }));

  const todaysSnapshot: Snapshot | undefined = history.length ? history.slice(-1)[0] : undefined;

  return todaysSnapshot ? (
    <div className={totalsClass}>
      <div className={subtitleClass}>
        Snapshot for {format(new Date(todaysSnapshot.day), 'eee, MMM do')}
      </div>
      <div className={tokenListClass}>
        {todaysSnapshot.portfolio.map(({ amount, name, value }) => (
          <div key={name} className={tokenClass}>
            <div className={tokenDetailsClass}>
              <h1>{name}</h1>
              <p>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  amount * value,
                )}
              </p>
            </div>
            <button>Edit</button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className={loadingClass}>Loading...</div>
  );
};

export default Totals;
