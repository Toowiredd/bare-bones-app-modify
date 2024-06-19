import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DebuggingPage from '../pages/DebuggingPage';

test('renders DebuggingPage and runs test', () => {
  render(<DebuggingPage />);
  const runTestButton = screen.getByText(/Run Test/i);
  expect(runTestButton).toBeInTheDocument();

  fireEvent.click(runTestButton);
  const testResult = screen.getByText(/Sample Test - Passed/i);
  expect(testResult).toBeInTheDocument();
});

test('exports logs', () => {
  render(<DebuggingPage />);
  const exportLogsButton = screen.getByText(/Export Logs/i);
  expect(exportLogsButton).toBeInTheDocument();

  fireEvent.click(exportLogsButton);
  // Since we can't test file download directly, we assume the function works if no errors are thrown
});