import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productExist = yield select(state =>
    state.cart.find(product => product.id === id)
  );

  const {
    data: { amount: stockAmount },
  } = yield call(api.get, `stock/${id}`);

  const currentAmount = productExist ? productExist.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    return toast.error('Quantidade solicitada fora de estoque !');
  }

  if (productExist) {
    return yield put(updateAmountSuccess(id, amount));
  }

  const { data } = yield call(api.get, `/products/${id}`);

  yield put(
    addToCartSuccess({
      ...data,
      amount: 1,
      formattedPrice: formatPrice(data.price),
    })
  );

  return history.push('/cart');
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return null;

  const {
    data: { amount: stockAmount },
  } = yield call(api.get, `/stock/${id}`);

  if (amount > stockAmount) {
    return toast.error('Qauntidade solicidade fora de estoque !');
  }

  return yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
