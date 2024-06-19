import React from 'react';
import { render, screen } from '@testing-library/react';
import { SupabaseProvider } from '../integrations/supabase/index';

test('renders children within SupabaseProvider', () => {
  render(
    <SupabaseProvider>
      <div>Test Child</div>
    </SupabaseProvider>
  );
  const childElement = screen.getByText(/Test Child/i);
  expect(childElement).toBeInTheDocument();
});