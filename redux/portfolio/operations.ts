import { Portfolio } from './portfolio';

import { setPortfolio, Dispatch } from './actions';

export const updatePortfolio = (portfolio: Portfolio) => (dispatch: Dispatch) => {
  dispatch(setPortfolio(portfolio));
};
