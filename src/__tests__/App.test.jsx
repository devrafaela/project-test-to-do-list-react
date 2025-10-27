import { render, screen } from "@testing-library/react";
import App from "../App";

test("renderiza o título da To Do List", () => {
  render(<App />);
  const titulo = screen.getByText(/To Do List/i);
  expect(titulo).toBeInTheDocument();
});
