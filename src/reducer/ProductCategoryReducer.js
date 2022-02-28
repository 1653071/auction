export default function todoAppReducer(state, { type, payload }) {
    switch (type) {
      case "init":
        return {
          categories: payload.categories,
          
        };
      
  
      default:
        return state;
    }
  }
  
  export const initialStateCate = {
    categories: [],
 };
  