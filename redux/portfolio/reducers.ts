import * as types from './constants';
import { Action } from './actions';
import { Portfolio } from './types';

type PortfolioState = {
  data: Portfolio
}

const initialState: PortfolioState = {
  data: []
};

const portfolioReducer = (state: PortfolioState = initialState, action: Action) => {
  switch (action.type) {
    case types.SET_PORTFOLIO:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default portfolioReducer;