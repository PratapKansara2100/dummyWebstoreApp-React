import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartDataInitialState = { items: [], totalQuantity: 0, changed: false };
const isCartVisible = { someting: false, notificatio: null };

const cartDataSlice = createSlice({
  name: "cartData",
  initialState: cartDataInitialState,
  reducers: {
    replace(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    add(state, action) {
      const data = action.payload;
      const existingItem = state.items.find((item) => item.id === data.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: data.id,
          price: data.price,
          quantity: 1,
          totalPrice: data.price,
          name: data.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += data.price;
      }
    },
    remove(state, data) {
      const id = data.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

const cartVisiblitySlice = createSlice({
  name: "cartVisiblity",
  initialState: isCartVisible,
  reducers: {
    toggle(state) {
      state.something = !state.something;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    removeNotification(state, action) {
      state.notification = null;
    },
  },
});

const store = configureStore({
  reducer: {
    cartData: cartDataSlice.reducer,
    cartVisibility: cartVisiblitySlice.reducer,
  },
});

export const cartDataActions = cartDataSlice.actions;
export const cartVisibilityActions = cartVisiblitySlice.actions;

export default store;
