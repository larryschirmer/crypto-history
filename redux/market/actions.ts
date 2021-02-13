import * as types from './constants';
import { Market } from './market';

export type Action =
  | {
      type: typeof types.FETCH_PRICES_REQUEST;
    }
  | {
      type: typeof types.FETCH_PRICES_SUCCESS;
      payload: Market;
    }
  | {
      type: typeof types.FETCH_PRICES_FAILURE;
    };

export type Dispatch = (arg: Action) => Action;

export const fetchMarketRequest = (): Action => ({
  type: types.FETCH_PRICES_REQUEST,
});

export const fetchMarketSuccess = (data: Market): Action => ({
  type: types.FETCH_PRICES_SUCCESS,
  payload: data,
});

export const fetchMarketFailure = (): Action => ({
  type: types.FETCH_PRICES_FAILURE,
});
