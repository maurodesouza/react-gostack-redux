import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExist = yield select(state =>
    state.cart.find(product => product.id === id)
  );

  if (productExist) {
    const amount = productExist.amount + 1;

    return yield put(updateAmount(id, amount));
  }

  const { data } = yield call(api.get, `/products/${id}`);

  return yield put(
    addToCartSuccess({
      ...data,
      amount: 1,
      formattedPrice: formatPrice(data.price),
    })
  );
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
