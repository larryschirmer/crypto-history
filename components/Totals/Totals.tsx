import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';

import { RootState } from '@redux/index';

import { useInitializeStore } from '@components/customHooks';

import styles from './Totals.module.scss';
import { Snapshot } from '@redux/history/types';

const { loading: loadingClass, totals: totalsClass, subtitle: subtitleClass } = styles;

const Totals: FC = () => {
  const { history } = useSelector(({ history }: RootState) => ({
    history: history.data,
  }));

  // fetch portfolio, market, or history if empty
  useInitializeStore();

  const todaysSnapshot: Snapshot | undefined = history.length ? history.slice(-1)[0] : undefined;

  return todaysSnapshot ? (
    <div className={totalsClass}>
      <div className={subtitleClass}>Snapshot for {format(new Date(todaysSnapshot.day), "eee, MMM do")}</div>
    </div>
  ) : (
    <div className={loadingClass}>Loading...</div>
  );
};

export default Totals;
