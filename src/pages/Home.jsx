import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "../components/Ticket";

import "./Home.css";

function Home() {
  const [ticketList, setTicketList] = useState([]);
  const [showNoTicketsMessage, setShowNoTicketsMessage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [listView, setListView] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterTerm, setFilterTerm] = useState("open");

  const refreshHelper = () => {
    setRefresh(!refresh);
  };

  const listViewToggle = () => {
    setListView(!listView);
  };

  const url = searchTerm
    ? "http://localhost:8080/api/v1/people"
    : `http://localhost:8080/api/v1/people?page=${page}&size=${size}&sort=id,${sortOrder}`;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url);
      const data = res.data;
      setTicketList(data.content);
      setTotalPages(data.totalPages);
    };
    getData();
  }, [url, refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ticketList.length === 0) {
        setShowNoTicketsMessage(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [ticketList]);

  // @todo fix state not updating immediately
  useEffect(() => {
    if (listView) {
      setSize(10);
    }
  }, [listView]);

  // @todo add row click to details page
  const handleRowClick = (id) => {
    // props.history.push(`/tickets/${id}`);
    console.log(id);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const pageChangeHandler = (e, newPage) => {
    setPage(newPage);
  };

  const filteredTicketList = ticketList
    .filter((ticket) => {
      const params = `${ticket.personalName.givenNames[0].value} ${ticket.personalName.surname.value} ${ticket.address.number} ${ticket.address.street}`;
      return params.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((ticket) => {
      if (filterTerm === "") {
        return ticketList;
      } else if (filterTerm === "completed") {
        return ticket.address.number.toLowerCase() === "completed";
      } else if (filterTerm === "open") {
        return ticket.address.number.toLowerCase() !== "completed";
      }
      return true;
    });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const sortOrderSwitch = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  return (
    <div className="home-container">
      <div className="home-nav">
        <div className="filter">
          <select
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          >
            <option value="open">All Open</option>
            <option value="">All</option>
            <option value="completed">Completed Tickets</option>
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
      {showNoTicketsMessage && <h1>No tickets yet...</h1>}
      {listView ? (
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
                <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                  <td>{ticket.personalName.givenNames[0].value}</td>
                  <td>{ticket.personalName.surname.value}</td>
                  <td>{ticket.address.number}</td>
                  <td>{ticket.address.street}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="card-list-view">
          {filteredTicketList.map((ticket) => {
            return (
              <Ticket
                key={ticket.id}
                id={ticket.id}
                title={ticket.personalName.givenNames[0].value}
                description={ticket.personalName.surname.value}
                status={ticket.address.number}
                priority={ticket.address.street}
                refresh={refreshHelper}
                listView={false}
              />
            );
          })}
        </div>
      )}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
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
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
