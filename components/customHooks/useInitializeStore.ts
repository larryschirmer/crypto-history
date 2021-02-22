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
  const { portfolio, market } = useSelector(({ portfolio, market }: RootState) => ({
    portfolio,
    market,
  }));

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

  // generate history if others are set or update
  useEffect(() => {
    const shouldUpdate = !isEmpty(marketData) && !isEmpty(portfolioData);
    if (shouldUpdate) {
      dispatch(generatePortfolio({ portfolio: portfolioData, market: marketData }));
    }
  }, [dispatch, marketData, portfolioData]);
};

export default useInitializeStore;
