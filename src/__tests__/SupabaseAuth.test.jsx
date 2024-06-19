import React from 'react';
import { render, screen } from '@testing-library/react';
import { SupabaseAuthUI } from '../integrations/supabase/auth';

test('renders Supabase Auth UI', () => {
  render(<SupabaseAuthUI />);
  const authElement = screen.getByText(/Sign in with/i);
  expect(authElement).toBeInTheDocument();
});