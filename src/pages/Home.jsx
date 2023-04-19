import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "../components/Ticket";

import "./Home.css";

function Home(props) {
  const [ticketList, setTicketList] = useState([]);
  const [showNoTicketsMessage, setShowNoTicketsMessage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshHelper = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/people");
      const data = res.data;
      setTicketList(data.content);
    };
    getData();
  }, [refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ticketList.length === 0) {
        setShowNoTicketsMessage(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [ticketList]);

  return (
    <div className="home-container">
      {showNoTicketsMessage && <h1>No tickets yet...</h1>}
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
          />
        );
      })}
    </div>
  );
}

export default Home;
