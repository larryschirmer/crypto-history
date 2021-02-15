import * as types from './constants';
import { Token, Portfolio } from './types';

export type Action =
  | {
      type: typeof types.SET_PORTFOLIO;
      payload: Token;
    }
  | {
      type: typeof types.INITIALIZE_PORTFOLIO;
      payload: Portfolio;
    };

export type Dispatch = (arg: Action) => Action;

export const initializePortfolio = (data: Portfolio): Action => ({
  type: types.INITIALIZE_PORTFOLIO,
  payload: data,
});
export const setPortfolio = (data: Token): Action => ({
  type: types.SET_PORTFOLIO,
  payload: data,
});
