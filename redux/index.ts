import { combineReducers } from 'redux';

import { portfolioReducer } from './portfolio';
import { marketReducer } from './market';

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  market: marketReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
