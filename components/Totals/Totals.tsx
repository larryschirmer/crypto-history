import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';

import { RootState } from '@redux/index';
import { Snapshot } from '@redux/history/types';

import styles from './Totals.module.scss';

const {
  loading: loadingClass,
  totals: totalsClass,
  title: titleClass,
  subtitle: subtitleClass,
  'token-list': tokenListClass,
  token: tokenClass,
  'token-details': tokenDetailsClass,
} = styles;

const Totals: FC = () => {
  const router = useRouter();
  const { history } = useSelector(({ history }: RootState) => ({
    history: history.data,
  }));

  const todaysSnapshot: Snapshot | undefined = history.length ? history.slice(-1)[0] : undefined;
  const snapshotDate = !!todaysSnapshot?.day && new Date(todaysSnapshot.day);
  const total = todaysSnapshot?.portfolio.reduce(
    (sum, token) => sum + +token.amount * +token.value,
    0,
  );

  const handleEditToken = (id: string) => {
    router.push({
      pathname: '/settings/[id]',
      query: { id },
    });
  };

  return todaysSnapshot ? (
    <div className={totalsClass}>
      <div className={titleClass}>
        Snapshot for{' '}
        {!!snapshotDate &&
          format(addMinutes(snapshotDate, snapshotDate.getTimezoneOffset()), 'eee, MMM do')}
      </div>
      <div className={subtitleClass}>
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
          +total.toPrecision(2),
        )}
      </div>
      <div className={tokenListClass}>
        {todaysSnapshot.portfolio.map(({ amount, name, value }) => (
          <div key={name} className={tokenClass}>
            <div className={tokenDetailsClass}>
              <h1>{name}</h1>
              <p>
                :{' '}
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  +(+amount * +value).toPrecision(2),
                )}
              </p>
            </div>
            <button onClick={() => handleEditToken(name)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className={loadingClass}>Loading...</div>
  );
};

export default Totals;
