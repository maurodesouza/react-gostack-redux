import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
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

    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const index = draft.findIndex(({ id }) => id === action.id);

        if (index >= 0) {
          draft.splice(index, 1);
        }
      });

    default:
      return state;
  }
}
