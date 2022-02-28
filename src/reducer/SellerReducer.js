export default function todoAppReducer(state, { type, payload }) {
    switch (type) {
      case "init_seller_products":
        return {
          items: payload.items,
        
          filter: payload.filter,
        };
      
      case "add_item":
        return {
          ...state,
          items: [...state.items, payload],
        };
  
      
      case "filter_due":
        return {
          ...state,
          filter: payload,
        };
        case "filter_success":
        return {
          ...state,
          filter: payload,
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
   
    filter:"all"
  };
  