import * as types from './constants';
import { Action } from './actions';
import { Market } from './types';

type MarketState = {
  data: Market;
  isFetching: boolean;
  error: boolean;
  initialized: boolean;
};

const initialState: MarketState = {
  data: {},
  isFetching: false,
  error: false,
  initialized: false,
};

const marketReducer = (state: MarketState = initialState, action: Action): MarketState => {
  switch (action.type) {
    case types.FETCH_PRICES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_PRICES_SUCCESS:
      return {
        ...initialState,
        data: action.payload,
        initialized: true,
      };
    case types.FETCH_PRICES_FAILURE:
      return {
        ...initialState,
        error: true,
        initialized: true,
      };
    default:
      return state;
  }
};

export default marketReducer;
