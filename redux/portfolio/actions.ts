import * as types from './constants';
import { Token, Portfolio } from './types';

export type Action =
  | {
      type: typeof types.DELETE_TOKEN;
      payload: string;
    }
  | {
      type: typeof types.SET_TOKEN;
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

export const setToken = (data: Token): Action => ({
  type: types.SET_TOKEN,
  payload: data,
});

export const deleteToken = (data: string): Action => ({
  type: types.DELETE_TOKEN,
  payload: data,
});
