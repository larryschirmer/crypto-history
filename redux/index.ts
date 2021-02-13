import { combineReducers } from 'redux';

import { portfolioReducer } from './portfolio';
import { historyReducer } from './history';
import { marketReducer } from './market';

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  market: marketReducer,
  history: historyReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
