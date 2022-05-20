import { render, screen } from '@testing-library/react';
import App from './News';

test('renders learn react link', () => {
  render(<News />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
