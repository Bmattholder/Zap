import { configureStore } from "@reduxjs/toolkit";

import ticketListReducer from "./slices/ticketListSlice";
import ticketReducer from "./slices/ticketSlice";

const store = configureStore({
  reducer: { ticketList: ticketListReducer, ticket: ticketReducer },
});

export default store;
