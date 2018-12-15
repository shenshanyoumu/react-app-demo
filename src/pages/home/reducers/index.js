import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import stockReducer from './stockReducer';

export default combineReducers({
  news: newsReducer,
  stock: stockReducer,
});
