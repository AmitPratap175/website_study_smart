import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

test('renders header with title', () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const titleElement = screen.getByText(/StudySmart/i);
  expect(titleElement).toBeInTheDocument();
});
