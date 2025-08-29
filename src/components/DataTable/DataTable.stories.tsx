// src/components/DataTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import DataTable, { type Column, type DataTableProps } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// below are example columns
const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

// below are example data
const data: User[] = [
  { id: 1, name: "Rohan", email: "Rohan123@example.com", age: 25 },
  { id: 2, name: "Rahul", email: "Rahul321@example.com", age: 30 },
  { id: 3, name: "Aniket", email: "aniket@example.com", age: 22 },
];

const UserTable = (props: DataTableProps<User>) => <DataTable<User> {...props} />;

const meta: Meta<typeof UserTable> = {
  title: "Components/DataTable",
  component: UserTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserTable>;

export const Default: Story = {
  args: {
    data,
    columns,
  },
};


export const Loading: Story = {
  args: {
    data: [] as User[],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [] as User[],
    columns,
  },
};

export const Selectable: Story = {
  args: {
    data,
    columns,
    selectable: true,
    onRowSelect: (selectedRows) => console.log("Selected rows:", selectedRows),
  },
};

export const Sortable: Story = {
  args: {
    data,
    columns,
  },
};
