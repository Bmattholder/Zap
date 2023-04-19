import React, { useState } from "react";

import "./Ticket.css";
import axios from "axios";

function Ticket({ id, title, description, priority, status, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [editingTicket, setEditingTicket] = useState({
    praenomens: title,
    cognomen: description,
    number: status,
    street: priority,
  });

  const { praenomens, cognomen, number, street } = editingTicket;

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditingTicket((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditingTicket((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitEdit = async (e, id) => {
    e.preventDefault();

    const res = await axios.patch(
      "http://localhost:8080/api/v1/people/" + id,
      editingTicket
    );
    console.log(res);
    setEditMode(!editMode);
    refresh();
  };

  const onDelete = async (e, id) => {
    e.preventDefault();

    const res = await axios.delete("http://localhost:8080/api/v1/people/" + id);
    console.log(res);
    refresh();
  };

  return (
    <div className="display-ticket">
      {!editMode ? (
        <>
          <h2>{title}</h2> <p>{description}</p> <p>{status}</p>{" "}
          <p>
            <em>{priority}</em>{" "}
          </p>
          <button onClick={() => setEditMode(!editMode)}>Edit</button>
          <button onClick={(e) => onDelete(e, id)}>Delete</button>
        </>
      ) : (
        <form>
          <input
            type="text"
            name="praenomens"
            id="praenomens"
            value={praenomens}
            onChange={onChange}
            placeholder="Issue"
            required
          />
          <input
            type="text"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            onChange={onChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="number"
            id="number"
            value={number}
            onChange={onChange}
            placeholder="Status"
            required
          />
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={onChange}
            placeholder="Priority"
            required
          />
          <button onClick={(e) => submitEdit(e, id)}>Update</button>
          <button onClick={() => setEditMode(!editMode)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Ticket;
