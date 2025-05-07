import { configureStore } from "@reduxjs/toolkit"

const initialState = {
  products: [
    { id: Math.random().toString(), name: 'Apple', price: 1 },
    { id: Math.random().toString(), name: 'Banana', price: 2 },
    { id: Math.random().toString(), name: 'Orange', price: 3 },
  ],
  cart: [],
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id), };
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: cartReducer,
})