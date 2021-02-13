import * as types from './constants';
import { Action } from './actions';
import { Portfolio } from './portfolio';

type PortfolioState = {
  portfolio: Portfolio
}

const initialState: PortfolioState = {
  portfolio: []
};

const portfolioReducer = (state: PortfolioState = initialState, action: Action) => {
  switch (action.type) {
    case types.SET_PORTFOLIO:
      return {
        ...state,
        portfolio: action.payload
      };
    default:
      return state;
  }
};

export default portfolioReducer;