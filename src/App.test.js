import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/RevRank/');
});

test('renders the navbar with every page link', () => {
  render(<App />);
  const nav = screen.getByRole('navigation');
  expect(nav).toHaveTextContent('RevRank');
  for (const label of ['Home', 'Garage', 'Add Car', 'Compare', 'Top Cars']) {
    expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
  }
});

test('renders the home page at the /RevRank basename', () => {
  render(<App />);
  expect(screen.getByText(/Behind Every Engine/i)).toBeInTheDocument();
});
