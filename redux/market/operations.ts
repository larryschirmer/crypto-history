import { Market, RawMarket } from './types';

import {
  fetchMarketFailure,
  fetchMarketRequest,
  fetchMarketSuccess,
  Dispatch,
} from './actions';

const apiBaseUrl = 'https://api.coingecko.com/api/v3';

export const fetchMarket = (ids: string[]) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(fetchMarketRequest());

  const idsString = ids.join(',').toString();
  const currenciesString = new Array(ids.length).fill('usd').join(',').toString();

  const res = await fetch(`${apiBaseUrl}/simple/price?ids=${idsString}&vs_currencies=${currenciesString}`);

  if (res.status === 200) {
    const data: RawMarket = await res.json();
    const market: Market = {};
    Object.keys(data).forEach((key) => (market[key] = data[key]?.usd));
    dispatch(fetchMarketSuccess(market));
  } else {
    dispatch(fetchMarketFailure());
  }
};
