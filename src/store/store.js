import { configureStore } from "@reduxjs/toolkit";

import ticketListReducer from "./slices/ticketListSlice";

const store = configureStore({
  reducer: { ticketList: ticketListReducer },
});

export default store;
