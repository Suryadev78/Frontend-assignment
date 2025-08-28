// src/components/InputField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField", // Sidebar section
  component: InputField,          // The actual component
  tags: ["autodocs"],             // Optional: enables docs tab
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Example stories
export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    variant: "outlined",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    showPasswordToggle: true,
    placeholder: "Enter password",
    variant: "filled",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "Disabled field",
    disabled: true,
    variant: "ghost",
  },
};

export const Error: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    invalid: true,
    errorMessage: "This field is required",
  },
};

export const Loading: Story = {
  args: {
    label: "Loading Field",
    placeholder: "Please wait...",
    loading: true,
  },
};
