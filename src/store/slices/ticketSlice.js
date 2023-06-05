import { createSlice } from "@reduxjs/toolkit";

const initialTicketState = {
  ticketList: [],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState: initialTicketState,
  reducers: {
    setTicket(state, action) {
      state.ticketList = action.payload;
    },
    setEditMode(state, action) {
      const { ticketId, editMode } = action.payload;

      const ticket = state.ticketList.find((t) => t.id === ticketId);
      if (ticket) {
        ticket.editMode = editMode;
      }
    },
  },
});

export const ticketActions = ticketSlice.actions;

export default ticketSlice.reducer;
