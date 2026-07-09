import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SmartNavigation from "./SmartNavigation";

describe("SmartNavigation component", () => {
  it("renders the location control panel", () => {
    render(<SmartNavigation />);
    expect(screen.getByText(/Map Layers/i)).toBeInTheDocument();
  });

  it("selects a destination and updates route info", () => {
    render(<SmartNavigation />);
    const targetText = screen.getByText(/Green Pitch Bites/i);
    fireEvent.click(targetText);

    expect(screen.getByText(/Active Route/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Green Pitch Bites/i).length).toBeGreaterThan(0);
  });

  it("toggles wheelchair accessible route", () => {
    render(<SmartNavigation />);
    const toggle = screen.getByRole("checkbox", { name: /Use wheelchair accessible route/i });
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});
