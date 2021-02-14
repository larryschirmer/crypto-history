import * as types from './constants';
import { Action } from './actions';
import { Market } from './types';

type MarketState = {
  data: Market;
  isFetching: Boolean;
  error: Boolean;
};

const initialState: MarketState = {
  data: {},
  isFetching: false,
  error: false,
};

const marketReducer = (state: MarketState = initialState, action: Action) => {
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
      };
    case types.FETCH_PRICES_FAILURE:
      return {
        ...initialState,
        error: true,
      };
    default:
      return state;
  }
};

export default marketReducer;
