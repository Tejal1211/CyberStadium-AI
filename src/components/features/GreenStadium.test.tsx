import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import GreenStadium from "./GreenStadium";

describe("GreenStadium component", () => {
  it("renders the eco dashboard tabs", () => {
    render(<GreenStadium />);
    expect(screen.getByText(/Eco Dashboard/i)).toBeInTheDocument();
  });

  it("switches between water and waste tabs", () => {
    render(<GreenStadium />);
    const waterButton = screen.getByRole("button", { name: /Water Operations/i });
    fireEvent.click(waterButton);
    expect(screen.getByText(/Water Recycling & Greywater Systems/i)).toBeInTheDocument();

    const wasteButton = screen.getByRole("button", { name: /Waste Analytics/i });
    fireEvent.click(wasteButton);
    expect(screen.getByText(/Stadium Waste & Circular Economy Logs/i)).toBeInTheDocument();
  });
});
