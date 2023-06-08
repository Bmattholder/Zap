import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "../pages/Home";
import store from "../store/store";

describe("Home Component", () => {
  it("should render the component without errors", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText("All Bugs")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("On Hold")).toBeInTheDocument();
  });
});
