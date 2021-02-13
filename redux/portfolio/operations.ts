import { Portfolio } from './portfolio';

import { setPortfolio, Dispatch } from './actions';

export const updatePortfolio = (portfolio: Portfolio) => (dispatch: Dispatch) => {
  dispatch(setPortfolio(portfolio));
  window.localStorage.setItem('portfolio', JSON.stringify(portfolio));
};

export const fetchPortfolio = () => (dispatch: Dispatch) => {
  const portfolio: Portfolio = JSON.parse(window.localStorage.getItem('portfolio') ?? "[]");
  dispatch(setPortfolio(portfolio));
};
