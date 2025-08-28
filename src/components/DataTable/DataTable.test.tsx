// src/components/DataTable.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable, {type  Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name" },
];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

test("renders table headers and rows", () => {
  render(<DataTable data={data} columns={columns} />);
  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();
});

test("shows loading state", () => {
  render(<DataTable data={[]} columns={columns} loading={true} />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("shows empty state", () => {
  render(<DataTable data={[]} columns={columns} />);
  expect(screen.getByText("No data to display.")).toBeInTheDocument();
});

test("row selection works", () => {
  const onRowSelect = jest.fn();
  render(<DataTable data={data} columns={columns} selectable onRowSelect={onRowSelect} />);
  const firstCheckbox = screen.getAllByRole("checkbox")[1]; // first row checkbox
  fireEvent.click(firstCheckbox);
  expect(onRowSelect).toHaveBeenCalledWith([data[0]]);
});
