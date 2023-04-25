import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "../components/Ticket";

import "./Home.css";

function Home(props) {
  const [ticketList, setTicketList] = useState([]);
  const [showNoTicketsMessage, setShowNoTicketsMessage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [listView, setListView] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  const refreshHelper = () => {
    setRefresh(!refresh);
  };

  const listViewToggle = () => {
    setListView(!listView);
  };

  const url = `http://localhost:8080/api/v1/people?page=${page}&size=${size}`;

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
    } else {
      setSize(3);
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

  return (
    <div className="home-container">
      <div className="home-nav">
        <select value={listView ? "list" : "kanban"} onChange={listViewToggle}>
          <option value="list">List View</option>
          <option value="kanban">Kanban View</option>
        </select>
      </div>
      {showNoTicketsMessage && <h1>No tickets yet...</h1>}
      {listView ? (
        <table>
          <thead>
            <tr>
              <th>Title </th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {ticketList.map((ticket) => {
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
          {ticketList.map((ticket) => {
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
  );
}

export default Home;
