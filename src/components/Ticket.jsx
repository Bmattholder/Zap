import React, { useState } from "react";
import "./Ticket.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { ticketActions } from "../store/slices/ticketSlice";

function Ticket({
  id,
  title,
  description,
  priority,
  status,
  refresh,
  draggedTicketHelper,
}) {
  const dispatch = useDispatch();
  const ticketList = useSelector((state) => state.ticket.ticketList);
  const ticket = ticketList.find((t) => t.id === id);
  const editMode = ticket ? ticket.editMode : false;

  const [editingTicket, setEditingTicket] = useState({
    praenomens: [title],
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
    dispatch(ticketActions.setEditMode({ ticketId: id, editMode: false }));
    refresh();
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    const res = await axios.delete("http://localhost:8080/api/v1/people/" + id);
    console.log(res);
    refresh();
  };

  const onSelectChange = (e) => {
    setEditingTicket((prevState) => ({
      ...prevState,
      number: e.target.value,
    }));
  };

  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData(id, target.id);
    const draggedTicket = {
      id,
      title,
      description,
      priority,
      status,
    };
    draggedTicketHelper(draggedTicket);
  };

  const cancelHelper = () => {
    dispatch(ticketActions.setEditMode({ ticketId: id, editMode: false }));
    setEditingTicket({
      praenomens: title,
      cognomen: description,
      number: status,
      street: priority,
    });
  };

  return (
    <div className="display-ticket" draggable={true} onDragStart={dragStart}>
      {!editMode ? (
        <>
          <Link to={`/tickets/${id}`}>
            <FiExternalLink />
          </Link>
          <div className="title">
            <h4>{title}</h4>
          </div>
          <p>{status}</p>
          <p>
            <em>{priority}</em>
          </p>
          <button
            onClick={() =>
              dispatch(
                ticketActions.setEditMode({ ticketId: id, editMode: true })
              )
            }
          >
            Edit
          </button>
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

          <select
            name="number"
            id="number"
            value={number}
            onChange={onSelectChange}
            required
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Waiting">Waiting</option>
            <option value="Done">Done</option>
            <option value="On Hold">On Hold</option>
          </select>
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={onChange}
            placeholder="Priority"
            required
          />
          <div className="form-buttons">
            <button onClick={(e) => submitEdit(e, id)}>Update</button>
            <button onClick={cancelHelper}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Ticket;
