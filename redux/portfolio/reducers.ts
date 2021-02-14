import * as types from './constants';
import { Action } from './actions';
import { Portfolio } from './types';

type PortfolioState = {
  data: Portfolio;
  initialized: boolean;
};

const initialState: PortfolioState = {
  data: [],
  initialized: false,
};

const portfolioReducer = (state: PortfolioState = initialState, action: Action): PortfolioState => {
  switch (action.type) {
    case types.SET_PORTFOLIO:
      return {
        ...state,
        data: action.payload,
        initialized: true,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
