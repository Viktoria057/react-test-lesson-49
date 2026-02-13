import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";

describe("UserProfile component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("показує індикатор завантаження під час отримання даних", () => {
    vi.spyOn(global, "fetch").mockReturnValue(
      new Promise(() => {}) 
    );

    render(<UserProfile />);

    expect(
      screen.getByText(/loading/i)
    ).toBeInTheDocument();
  });

  it("відображає дані користувача після успішного запиту", async () => {
    const mockUser = {
      id: 1,
      name: "Leanne Graham",
      email: "leanne@example.com",
      username: "Bret",
    };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile />);

    const heading = await screen.findByRole("heading");
    expect(heading).toHaveTextContent("Leanne Graham");
    expect(screen.getByText(/leanne@example.com/i)).toBeInTheDocument();
  });

  it("відображає повідомлення про помилку, якщо запит не вдався", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    });

    render(<UserProfile />);

    expect(
      await screen.findByText(/error/i)
    ).toBeInTheDocument();
  });
});

