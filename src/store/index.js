import { createStore } from 'redux';

import root from './modules/root';

const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(root, enhancer);

export default store;
