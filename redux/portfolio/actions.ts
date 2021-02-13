import * as types from './constants';
import { Portfolio } from './portfolio';

export type Action = {
      type: typeof types.SET_PORTFOLIO;
      payload: Portfolio;
    };

export type Dispatch = (arg: Action) => Action;

export const setPortfolio = (data: Portfolio): Action => ({
  type: types.SET_PORTFOLIO,
  payload: data,
});
