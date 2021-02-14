import * as types from './constants';
import { History } from './types';

export type Action =
  | {
      type: typeof types.GENERATE_PORTFOLIO;
      payload: History;
    };

export type Dispatch = (arg: Action) => Action;

export const generatePortfolioAction = (data: History): Action => ({
  type: types.GENERATE_PORTFOLIO,
  payload: data
});
