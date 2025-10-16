import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders api tester heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /autotablica api tester/i });
  expect(heading).toBeInTheDocument();
});
