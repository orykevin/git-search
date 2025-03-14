import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import App from "./App";
import { exampleData } from "./lib/mockdata";

test("initial state", async () => {
  render(<App />);
  expect(screen.queryByTestId("users")).toBeNull();
  expect(screen.queryByTestId("openDrawer")).toBeNull();
  expect(screen.getByText("Who are you looking for?")).toBeInTheDocument();
});

test("empty history", async () => {
  render(<App />);
  expect(screen.getByText("No Search History")).toBeInTheDocument();
});

test("open history drawer", async () => {
  global.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === "(max-width: 768px)", // Simulate mobile view
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
  render(<App />);
  const openDrawerTrigger = screen.getByTestId("openDrawerTrigger");
  await fireEvent.click(openDrawerTrigger);
  expect(screen.getByTestId("openDrawer")).toBeInTheDocument();
});

test("search user function", async () => {
  render(<App />);
  expect(screen.getByText("No Search History")).toBeInTheDocument();
  const usersInput = screen.getByTestId("usersInput");
  const users = "orykevin";
  await fireEvent.change(usersInput, {
    target: { value: users },
  });
  const submitButton = screen.getByTestId("submitSearch");
  await fireEvent.click(submitButton);
  expect(await screen.findByText("Searching...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText("Searching...")).not.toBeInTheDocument();
  });

  expect(await screen.findByText("@orykevin")).toBeInTheDocument();

  expect(screen.queryByText("No Search History")).not.toBeInTheDocument();
});

test("clear history", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
    // Simulate local storage for history
    if (key === "history") {
      return JSON.stringify([
        { history: exampleData, date: new Date(), id: 1 },
      ]);
    }
    return null;
  });
  render(<App />);

  expect(screen.queryByText("No Search History")).not.toBeInTheDocument();
  expect(screen.getByTestId("userAvatarLink-1")).toBeInTheDocument();
  const clearAllButon = screen.getByTestId("clearAllHistory");
  await fireEvent.click(clearAllButon);
  expect(screen.queryByText("Clear All History")).toBeInTheDocument();
  const confrimClearAllButon = screen.getByTestId("confirmClearAllHistory");
  await fireEvent.click(confrimClearAllButon);
  expect(screen.queryByText("No Search History")).toBeInTheDocument();
});
