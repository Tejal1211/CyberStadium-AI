import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MultilingualAssistant from "./MultilingualAssistant";

describe("MultilingualAssistant component", () => {
  it("renders language selector and English default output", () => {
    render(<MultilingualAssistant />);
    expect(screen.getByText(/Language Selection/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to the FIFA World Cup 2026 Stadium Concourse/i)).toBeInTheDocument();
  });

  it("changes displayed translation when selecting Arabic", () => {
    render(<MultilingualAssistant />);
    const arabicButton = screen.getByRole("button", { name: /Arabic/i });
    fireEvent.click(arabicButton);

    expect(screen.getByText(/مرحباً بكم في ساحة استاد كأس العالم فيفا 2026/i)).toBeInTheDocument();
  });
});
