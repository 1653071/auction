export default function todoAppReducer(state, { type, payload }) {
  switch (type) {
    case "init":
      return {
        items: payload.items,
        query: payload.query,
        category_id: payload.category_id,
      };
    case "init_seller_products":
      return {
        items: payload.items,
        query: payload.query,
        
      };
    case "add_item":
      return {
        ...state,
        items: [...state.items, payload],
      };

    case "update_filter":
      return {
        ...state,
        query: payload,
      };
    case "category_filter":
      return {
        ...state,
        category_id: payload,
      };
    case "complete_task":
      return {
        ...state,
        items: state.items.map(function (i) {
          if (i.id === payload) return { ...i, complete: true };

          return i;
        }),
      };

    default:
      return state;
  }
}

export const initialState = {
  items: [],
  query: "",
  category_id: "all",
};
