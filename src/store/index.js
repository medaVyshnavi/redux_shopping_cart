import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const cartSlice = createSlice({
  name: "cart",
  initialState: { totalQuantity: 0, items: [] , isChanged : false },
  reducers: {
    replaceCart(state,action){
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addQuantity(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.isChanged = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          totalQuantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.totalQuantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    subtractQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((index) => index.id == id);
      state.totalQuantity--;
      state.isChanged = true;
      if (existingItem.totalQuantity === 1) {
        state.items = state.items.filter((item) => item.id != id);
      } else {
        existingItem.totalQuantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

const showCartSlice = createSlice({
  name: "showCart",
  initialState: { isShowCart: false, notification: null },
  reducers: {
    showCart(state) {
      state.isShowCart = !state.isShowCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    showCart: showCartSlice.reducer,
  },
});



export const showCartActions = showCartSlice.actions;
export const cartActions = cartSlice.actions;

export default store;
