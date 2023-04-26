import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm(props) {
  const [authFormData, setAuthFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = authFormData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setAuthFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(authFormData);
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={onChange}
        required
      />
      <button>Log in </button>
    </form>
  );
}

export default AuthForm;
