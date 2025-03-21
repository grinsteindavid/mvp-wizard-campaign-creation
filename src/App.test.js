import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Project Creator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Project Creator/i);
  expect(titleElement).toBeInTheDocument();
});
