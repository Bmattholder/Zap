import { createSlice } from "@reduxjs/toolkit";

const initialTicketState = {
  praenomens: "",
  cognomen: "",
  number: "",
  street: "",
  editMode: false,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState: initialTicketState,
  reducers: {
    setTicket(state, action) {
      state.ticketList = action.payload;
    },
    setEditMode(state) {
      state.editMode = state.editMode !== true;
    },
  },
});

export const ticketActions = ticketSlice.actions;

export default ticketSlice.reducer;
