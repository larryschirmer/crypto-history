import { Token, Portfolio } from './types';

import { initializePortfolio, setToken, deleteToken, Dispatch } from './actions';

export const updatePortfolio = (token: Token) => (dispatch: Dispatch): void => {
  dispatch(setToken(token));

  const portfolio: Portfolio = JSON.parse(window.localStorage.getItem('portfolio') ?? '[]');

  const isIncluded = portfolio.find(({ name }) => name === token.name);
  const updatedData = isIncluded
    ? portfolio.map(({ name, amount }) => (name === token.name ? token : { name, amount }))
    : [...portfolio, token];

  window.localStorage.setItem('portfolio', JSON.stringify(updatedData));
};

export const removeToken = (tokenId: string) => (dispatch: Dispatch): void => {
  const portfolio: Portfolio = JSON.parse(window.localStorage.getItem('portfolio') ?? '[]');

  const isIncluded = portfolio.find(({ name }) => name === tokenId);
  const updatedData = isIncluded ? portfolio.filter(({ name }) => name !== tokenId) : portfolio;

  window.localStorage.setItem('portfolio', JSON.stringify(updatedData));
  dispatch(deleteToken(tokenId));
};

export const fetchPortfolio = () => (dispatch: Dispatch): void => {
  const portfolio: Portfolio = JSON.parse(window.localStorage.getItem('portfolio') ?? '[]');
  dispatch(initializePortfolio(portfolio));
};
