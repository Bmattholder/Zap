import { createSlice } from "@reduxjs/toolkit";

const initialTicketListState = {
  ticketList: [],
  showNoTicketsMessage: false,
  refresh: false,
  listView: false,
  page: 0,
  size: "*",
  totalPages: 0,
  searchTerm: "",
  sortOrder: "asc",
  filterTerm: "",
  draggedTicket: null,
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState: initialTicketListState,
  reducers: {
    setTicketList(state, action) {
      state.ticketList = action.payload;
    },
    setShowNoTicketsMessage(state, action) {
      state.showNoTicketsMessage = action.payload;
    },
    setRefresh(state) {
      state.refresh = state.refresh !== true;
    },
    setListView(state, action) {
      state.listView = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setFilterTerm(state, action) {
      state.filterTerm = action.payload;
    },
    setDraggedTicket(state, action) {
      state.draggedTicket = action.payload;
    },
  },
});

export const ticketListActions = ticketListSlice.actions;

export default ticketListSlice.reducer;
