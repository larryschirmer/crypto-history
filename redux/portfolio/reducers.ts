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
    case types.SET_TOKEN: {
      const token = action.payload;
      const isIncluded = state.data.find(({ name }) => name === token.name);
      const updatedData = isIncluded
        ? state.data.map(({ name, amount }) => (name === token.name ? token : { name, amount }))
        : [...state.data, token];

      return {
        ...state,
        data: updatedData,
        initialized: true,
      };
    }
    case types.DELETE_TOKEN: {
      const tokenId = action.payload;
      const isIncluded = state.data.find(({ name }) => name === tokenId);
      const updatedData = isIncluded
        ? state.data.filter(({ name }) => name !== tokenId)
        : state.data;

      return {
        ...state,
        data: updatedData,
        initialized: true,
      };
    }
    case types.INITIALIZE_PORTFOLIO:
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
