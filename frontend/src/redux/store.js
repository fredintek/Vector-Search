import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./slices/counter.slice";
import { apiSlice } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: CounterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
