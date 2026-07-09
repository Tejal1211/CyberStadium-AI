import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CrowdIntelligence from "./CrowdIntelligence";

describe("CrowdIntelligence component", () => {
  it("renders the phase timeline controls", () => {
    render(<CrowdIntelligence />);
    expect(screen.getByText(/Match Telemetry Timeline/i)).toBeInTheDocument();
  });

  it("changes phase to half-time rush and displays alert info", () => {
    render(<CrowdIntelligence />);
    const halfTimeButton = screen.getByRole("button", { name: /Half-time Rush/i });
    fireEvent.click(halfTimeButton);

    expect(screen.getByText(/Severe bottleneck detected in Food Courts Concourse B & C/i)).toBeInTheDocument();
  });
});
