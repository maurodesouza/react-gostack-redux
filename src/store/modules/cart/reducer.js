import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const index = draft.findIndex(({ id }) => id === action.product.id);

        if (index >= 0) {
          draft[index].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const index = draft.findIndex(({ id }) => id === action.id);

        if (index >= 0) {
          draft.splice(index, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT': {
      if (action.amount <= 0) return state;

      return produce(state, draft => {
        const index = draft.findIndex(({ id }) => id === action.id);

        if (index >= 0) {
          draft[index].amount = Number(action.amount);
        }
      });
    }

    default:
      return state;
  }
}
