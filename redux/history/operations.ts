import { Portfolio } from '@redux/portfolio/portfolio';
import { Market } from '@redux/market/market';
import { History, Snapshot } from './portfolioHistory';

import { generatePortfolioAction, Dispatch } from './actions';

type Props = {
  portfolio: Portfolio;
  market: Market;
};

const makeSnapshot = ({ portfolio, market }: Props): Snapshot => {
  const midnight = new Date().setUTCHours(0, 0, 0, 0);
  const date = new Date(midnight).toISOString();

  return {
    day: date,
    portfolio: portfolio.map(({ name, amount }) => ({
      name,
      amount,
      value: market[name],
    })),
  };
};

export const generatePortfolio = ({ portfolio, market }: Props) => (dispatch: Dispatch) => {
  const prevHistory: History = JSON.parse(window.localStorage.getItem('history') ?? '[]');

  const midnight = new Date().setUTCHours(0, 0, 0, 0);
  const date = new Date(midnight).toISOString();
  const isNewDay = !!prevHistory.find(({ day }) => day === date);

  let history: History;
  if (isNewDay) {
    history = [...prevHistory, makeSnapshot({ portfolio, market })];
  } else {
    const beforeToday = prevHistory.slice(0, -1);
    history = [...beforeToday, makeSnapshot({ portfolio, market })];
  }
  window.localStorage.setItem('history', JSON.stringify(history));
  dispatch(generatePortfolioAction(history));
};
