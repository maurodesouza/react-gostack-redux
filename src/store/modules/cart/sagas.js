import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
  const { data } = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
