import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./TicketDetails.css";

function TicketDetails(props) {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/api/v1/people/${id}`);
      const data = await response.json();
      setTicket(data);
    };
    fetchData();
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  console.log(ticket);

  return (
    <div className="ticket-details-container">
      <h1>{ticket.personalName.givenNames[0].value}</h1>
      <p>{ticket.personalName.surname.value}</p>
      <p>{ticket.address.number}</p>
      <p>{ticket.address.street}</p>
    </div>
  );
}

export default TicketDetails;
