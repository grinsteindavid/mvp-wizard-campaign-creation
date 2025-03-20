import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ad Campaign Creator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Ad Campaign Creator/i);
  expect(titleElement).toBeInTheDocument();
});
