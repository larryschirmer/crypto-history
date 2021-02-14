import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { RootState } from '@redux/index';

import { operations as portfolioOperations } from '@redux/portfolio';
import { operations as marketOperations } from '@redux/market';
import { operations as historyOperations } from '@redux/history';

const { fetchPortfolio } = portfolioOperations;
const { fetchMarket } = marketOperations;
const { generatePortfolio } = historyOperations;

const useInitializeStore = (): void => {
  const dispatch = useDispatch();
  const { portfolio, market, history } = useSelector(
    ({ portfolio, market, history }: RootState) => ({
      portfolio: portfolio.data,
      market: market.data,
      history: history.data,
    }),
  );

  // fetch portfolio if unset
  useEffect(() => {
    if (isEmpty(portfolio)) dispatch(fetchPortfolio());
  }, [dispatch, portfolio]);

  // fetch market if is empty and portfolio is set
  useEffect(() => {
    if (isEmpty(market) && !isEmpty(portfolio)) {
      const tokenIds = portfolio.map(({ name }) => name);
      dispatch(fetchMarket(tokenIds));
    }
  }, [dispatch, market, portfolio]);

  // generate history if empty and others are set
  useEffect(() => {
    if (isEmpty(history) && !isEmpty(market) && !isEmpty(portfolio)) {
      dispatch(generatePortfolio({ portfolio, market }));
    }
  }, [dispatch, history, market, portfolio]);
};

export default useInitializeStore;
