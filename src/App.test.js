import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GDF overview brand', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Global Design Foundations/i })).toBeInTheDocument();
});
