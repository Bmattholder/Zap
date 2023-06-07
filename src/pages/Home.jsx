import React, { useEffect } from "react";
import axios from "axios";
import Ticket from "../components/Ticket";

import { useSelector, useDispatch } from "react-redux";
import { ticketListActions } from "../store/slices/ticketListSlice";

import "./Home.css";
import { ticketActions } from "../store/slices/ticketSlice";

function Home(props) {
  const dispatch = useDispatch();
  const ticketList = useSelector((state) => state.ticketList.ticketList);
  const refresh = useSelector((state) => state.ticketList.refresh);
  const showNoTicketsMessage = useSelector(
    (state) => state.ticketList.showNoTicketsMessage
  );
  const listView = useSelector((state) => state.ticketList.listView);
  const page = useSelector((state) => state.ticketList.page);
  const size = useSelector((state) => state.ticketList.size);
  const totalPages = useSelector((state) => state.ticketList.totalPages);
  const searchTerm = useSelector((state) => state.ticketList.searchTerm);
  const sortOrder = useSelector((state) => state.ticketList.sortOrder);
  const filterTerm = useSelector((state) => state.ticketList.filterTerm);
  const draggedTicket = useSelector((state) => state.ticketList.draggedTicket);

  const handleRefresh = () => {
    dispatch(ticketListActions.setRefresh());
  };

  const listViewToggle = () => {
    if (listView === true) {
      dispatch(ticketListActions.setListView(false));
      dispatch(ticketListActions.setSize("*"));
    } else {
      dispatch(ticketListActions.setListView(true));
      dispatch(ticketListActions.setSize("15"));
    }
    dispatch(ticketListActions.setPage(0));
  };

  const url = searchTerm
    ? "http://localhost:8080/api/v1/people"
    : `http://localhost:8080/api/v1/people?page=${page}&size=${size}&sort=id,${sortOrder}`;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url);
      const data = res.data;
      dispatch(ticketListActions.setTicketList(data.content));
      dispatch(ticketListActions.setTotalPages(data.totalPages));
      dispatch(ticketActions.setTicket(data.content));
    };
    getData();
  }, [url, refresh]);

  useEffect(() => {
    if (ticketList.length === 0) {
      dispatch(ticketListActions.setShowNoTicketsMessage(true));
    } else {
      dispatch(ticketListActions.setShowNoTicketsMessage(false));
    }
  }, [ticketList, showNoTicketsMessage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const pageChangeHandler = (e, newPage) => {
    dispatch(ticketListActions.setPage(newPage));
  };

  const filteredTicketList = ticketList
    .filter((ticket) => {
      const params = `${ticket.personalName.givenNames[0].value} ${ticket.personalName.surname.value} ${ticket.address.number} ${ticket.address.street}`;
      return params.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((ticket) => {
      if (filterTerm === "") {
        return ticketList;
      } else if (filterTerm === "Done") {
        return ticket.address.number === "Done";
      } else if (filterTerm === "Open") {
        return ticket.address.number !== "Done";
      }
      return true;
    });

  const handleSearch = (e) => {
    dispatch(ticketListActions.setSearchTerm(e.target.value));
    dispatch(ticketListActions.setPage(0));
  };

  const clearSearch = () => {
    dispatch(ticketListActions.setSearchTerm(""));
  };

  const sortOrderSwitch = () => {
    if (sortOrder === "asc") {
      dispatch(ticketListActions.setSortOrder("desc"));
    } else {
      dispatch(ticketListActions.setSortOrder("asc"));
    }
  };

  const handleDrop = async (ticketId, newStatus) => {
    const updatedTicket = {
      ...draggedTicket,
      number: newStatus,
    };
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/people/${ticketId}`,
        updatedTicket
      );
    } catch (error) {
      console.log(error);
    }
    handleRefresh();
  };

  const draggedTicketHelper = (prevTicketState) => {
    dispatch(ticketListActions.setDraggedTicket(prevTicketState));
  };

  return (
    <div className="home-container">
      <div className="home-nav">
        <div className="filter">
          <select
            value={filterTerm}
            onChange={(e) =>
              dispatch(ticketListActions.setFilterTerm(e.target.value))
            }
          >
            <option value="">All Bugs</option>
            <option value="Open">All Open </option>
            <option value="Done">Squashed Bugs</option>
          </select>
        </div>
        <button onClick={listViewToggle}>
          {listView ? "List View" : "Kanban View"}
        </button>

        <div className="sort">
          <button onClick={sortOrderSwitch}>
            ID {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={clearSearch}>Clear</button>
        </div>
      </div>

      {listView ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredTicketList.map((ticket) => {
                return (
                  <tr key={ticket.id}>
                    <a href={`http://localhost:3000/tickets/${ticket.id}`}>
                      <td>{ticket.personalName.givenNames[0].value}</td>
                    </a>
                    <td>{ticket.personalName.surname.value}</td>
                    <td>{ticket.address.number}</td>
                    <td>{ticket.address.street}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button
              disabled={page === 0}
              onClick={() => dispatch(ticketListActions.setPage(page - 1))}
            >
              Prev
            </button>
            {pageNumbers.map((number) => {
              return (
                <button
                  key={number}
                  onClick={
                    number !== page ? (e) => pageChangeHandler(e, number) : null
                  }
                  className={page === number ? "active-button" : null}
                >
                  {number + 1}
                </button>
              );
            })}
            <button
              disabled={page === totalPages - 1}
              onClick={() => dispatch(ticketListActions.setPage(page + 1))}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="card-container">
          <div
            className="card-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(draggedTicket.id, "Not Started")}
            data-status="Not Started"
          >
            <h3>Not Started</h3>
            {filteredTicketList
              .filter((ticket) => ticket.address.number === "Not Started")
              .map((ticket) => (
                <Ticket
                  key={ticket.id}
                  id={ticket.id}
                  title={ticket.personalName.givenNames[0].value}
                  description={ticket.personalName.surname.value}
                  status={ticket.address.number}
                  priority={ticket.address.street}
                  refresh={handleRefresh}
                  handleDrop={handleDrop}
                  draggedTicketHelper={draggedTicketHelper}
                />
              ))}
          </div>
          <div
            className="card-column"
            onDragOver={(e) => e.preventDefault()}
            data-status="In Progress"
            onDrop={() => handleDrop(draggedTicket.id, "In Progress")}
          >
            <h3>In Progress</h3>
            {filteredTicketList
              .filter(
                (ticket) =>
                  ticket.address.number === "In Progress" ||
                  ticket.address.number === "Waiting"
              )
              .map((ticket) => (
                <Ticket
                  key={ticket.id}
                  id={ticket.id}
                  title={ticket.personalName.givenNames[0].value}
                  description={ticket.personalName.surname.value}
                  status={ticket.address.number}
                  priority={ticket.address.street}
                  refresh={handleRefresh}
                  handleDrop={handleDrop}
                  draggedTicketHelper={draggedTicketHelper}
                />
              ))}
          </div>
          <div
            className="card-column"
            onDragOver={(e) => e.preventDefault()}
            data-status="Done"
            onDrop={() => handleDrop(draggedTicket.id, "Done")}
          >
            <h3>Done</h3>
            {filteredTicketList
              .filter((ticket) => ticket.address.number === "Done")
              .map((ticket) => (
                <Ticket
                  key={ticket.id}
                  id={ticket.id}
                  title={ticket.personalName.givenNames[0].value}
                  description={ticket.personalName.surname.value}
                  status={ticket.address.number}
                  priority={ticket.address.street}
                  refresh={handleRefresh}
                  handleDrop={handleDrop}
                  draggedTicketHelper={draggedTicketHelper}
                />
              ))}
          </div>
          <div
            className="card-column"
            onDragOver={(e) => e.preventDefault()}
            data-status="On Hold"
            onDrop={() => handleDrop(draggedTicket.id, "On Hold")}
          >
            <h3>On Hold</h3>
            {filteredTicketList
              .filter((ticket) => ticket.address.number === "On Hold")
              .map((ticket) => (
                <Ticket
                  key={ticket.id}
                  id={ticket.id}
                  title={ticket.personalName.givenNames[0].value}
                  description={ticket.personalName.surname.value}
                  status={ticket.address.number}
                  priority={ticket.address.street}
                  refresh={handleRefresh}
                  draggedTicketHelper={draggedTicketHelper}
                />
              ))}
          </div>
        </div>
      )}
      {showNoTicketsMessage === true && <h1>No tickets yet...</h1>}
    </div>
  );
}

export default Home;
