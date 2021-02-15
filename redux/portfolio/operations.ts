import { Token, Portfolio } from './types';

import { initializePortfolio, setPortfolio, Dispatch } from './actions';

export const updatePortfolio = (portfolio: Token) => (dispatch: Dispatch): void => {
  dispatch(setPortfolio(portfolio));
  window.localStorage.setItem('portfolio', JSON.stringify(portfolio));
};

export const fetchPortfolio = () => (dispatch: Dispatch): void => {
  const portfolio: Portfolio = JSON.parse(window.localStorage.getItem('portfolio') ?? '[]');
  dispatch(initializePortfolio(portfolio));
};
