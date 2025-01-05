import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the error message', () => {
    render(<ErrorAlert error="An error occurred" />);

    expect(screen.getByText('An error occurred')).toBeDefined();
  });
});
