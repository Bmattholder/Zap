import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./NewTicketForm.css";

function NewTicketForm(props) {
  const [formData, setFormData] = useState({
    praenomens: "",
    cognomen: "",
    number: "Not Started",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const { praenomens, cognomen, number, street, city, state, zip } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSelectChange = (e) => {
    setFormData((p) => ({
      ...p,
      number: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8080/api/v1/people",
      formData
    );
    console.log(res);
    navigate("/");
  };

  return (
    <div className="ticket-form">
      <form onSubmit={onSubmit}>
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
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewTicketForm;
