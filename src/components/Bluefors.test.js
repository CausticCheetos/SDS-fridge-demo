import React from 'react';
import { render, screen } from '@testing-library/react';
import BlueFors from './BlueFors';

test('renders all valve indicators and pressure readings', () => {
  render(<BlueFors />);

  expect(screen.getByText('BlueFors Interface')).toBeInTheDocument();

  // Check that all valve indicators are present
  for (let i = 1; i <= 23; i++) {
    const valve = screen.getByAltText(`v${i}-indicator`);
    expect(valve).toBeInTheDocument();
  }

  // Check that all pressure readings are present
  for (let i = 1; i <= 6; i++) {
    const pressure = screen.getByText(`P${i}`);
    expect(pressure).toBeInTheDocument();
  }
});