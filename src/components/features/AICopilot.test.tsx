import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AICopilot from "./AICopilot";

describe("AICopilot component", () => {
  it("renders the initial copilot welcome message", () => {
    render(<AICopilot />);
    expect(screen.getByText(/Affirmative. I am the CyberStadium Operations Copilot/i)).toBeInTheDocument();
  });

  it("displays suggested prompts and can click one", async () => {
    render(<AICopilot />);
    const suggestionButton = screen.getByRole("button", { name: /Find the nearest medical center from Section 112/i });
    fireEvent.click(suggestionButton);

    await waitFor(() => expect(screen.getByText(/SYSTEM: Re-initializing connection.../i)).toBeInTheDocument(), { timeout: 2000 });
  });

  it("accepts custom input and renders a response", async () => {
    render(<AICopilot />);
    const input = screen.getByPlaceholderText(/Ask Stadium Copilot anything.../i);
    const sendButton = screen.getByRole("button", { name: /Send prompt to the copilot/i });

    fireEvent.change(input, { target: { value: "How busy is the South Gate entry queue right now?" } });
    fireEvent.click(sendButton);

    await waitFor(() => expect(screen.getByText(/South Gate currently has moderate congestion/i)).toBeInTheDocument(), { timeout: 5000 });
  });
});
