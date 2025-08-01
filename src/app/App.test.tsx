
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('renders app heading', () => {
  render(<App />);
  const testElement = screen.getByTestId('home-page')
  expect(testElement).toBeInTheDocument();
});
