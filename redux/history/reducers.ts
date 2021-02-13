import * as types from './constants';
import { Action } from './actions';
import { History } from './portfolioHistory';

type HistoryState = {
  data: History;
};

const initialState: HistoryState = {
  data: [],
};

const historyReducer = (state: HistoryState = initialState, action: Action) => {
  switch (action.type) {
    case types.GENERATE_PORTFOLIO:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default historyReducer;
