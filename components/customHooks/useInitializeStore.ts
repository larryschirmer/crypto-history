import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { operations as portfolioOperations } from '@redux/portfolio';
import { operations as marketOperations } from '@redux/market';
import { operations as historyOperations } from '@redux/history';
import { RootState } from '@redux/index';

const { fetchPortfolio } = portfolioOperations;
const { fetchMarket } = marketOperations;
const { generatePortfolio } = historyOperations;

const useInitializeStore = (): void => {
  const dispatch = useDispatch();
  const { portfolio, market, history } = useSelector(
    ({ portfolio, market, history }: RootState) => ({
      portfolio,
      market,
      history: history.data,
    }),
  );

  const { data: portfolioData, initialized: portfolioDidInitialized } = portfolio;
  const { data: marketData, initialized: marketDidInitialized } = market;

  // fetch portfolio if unset
  useEffect(() => {
    const shouldFetchData = isEmpty(portfolioData) && !portfolioDidInitialized;
    if (shouldFetchData) dispatch(fetchPortfolio());
  }, [dispatch, portfolioData, portfolioDidInitialized]);

  // fetch market if is empty and portfolio is set
  useEffect(() => {
    const shouldFetchData = isEmpty(marketData) && !marketDidInitialized && !isEmpty(portfolioData);
    if (shouldFetchData) {
      const tokenIds = portfolioData.map(({ name }) => name);
      dispatch(fetchMarket(tokenIds));
    }
  }, [dispatch, marketData, marketDidInitialized, portfolioData]);

  // generate history if empty and others are set
  useEffect(() => {
    const shouldUpdate = isEmpty(history) && !isEmpty(marketData) && !isEmpty(portfolioData);
    if (shouldUpdate) {
      dispatch(generatePortfolio({ portfolio: portfolioData, market: marketData }));
    }
  }, [dispatch, history, marketData, portfolioData]);
};

export default useInitializeStore;
