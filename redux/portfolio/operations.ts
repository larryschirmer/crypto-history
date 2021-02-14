import { Portfolio } from './types';

import { setPortfolio, Dispatch } from './actions';

export const updatePortfolio = (portfolio: Portfolio) => (dispatch: Dispatch): void => {
  dispatch(setPortfolio(portfolio));
  window.localStorage.setItem('portfolio', JSON.stringify(portfolio));
};

export const fetchPortfolio = () => (dispatch: Dispatch): Promise<Portfolio> => {
  const portfolio: Portfolio = JSON.parse(window.localStorage.getItem('portfolio') ?? "[]");
  dispatch(setPortfolio(portfolio));
  return new Promise<Portfolio>(res => res(portfolio))
};
