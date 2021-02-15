import { Token, Portfolio } from './types';

import { initializePortfolio, setPortfolio, Dispatch } from './actions';

export const updatePortfolio = (token: Token) => (dispatch: Dispatch): void => {
  dispatch(setPortfolio(token));

  const portfolio: Portfolio = JSON.parse(window.localStorage.getItem('portfolio') ?? '[]');

  const isIncluded = portfolio.find(({ name }) => name === token.name);
  const updatedData = isIncluded
    ? portfolio.map(({ name, amount }) => (name === token.name ? token : { name, amount }))
    : [...portfolio, token];

  window.localStorage.setItem('portfolio', JSON.stringify(updatedData));
};

export const fetchPortfolio = () => (dispatch: Dispatch): void => {
  const portfolio: Portfolio = JSON.parse(window.localStorage.getItem('portfolio') ?? '[]');
  dispatch(initializePortfolio(portfolio));
};
