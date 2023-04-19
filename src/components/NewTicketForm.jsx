import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./NewTicketForm.css";

function NewTicketForm(props) {
  const [formData, setFormData] = useState({
    praenomens: "",
    cognomen: "",
    number: "",
    street: "",
    city: "default",
    state: "default",
    zip: "default",
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
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewTicketForm;
