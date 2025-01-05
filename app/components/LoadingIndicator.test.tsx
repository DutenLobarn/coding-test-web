import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import Spinner from './Spinner';

describe('Spinner', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the loading indicator', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeDefined();
  });
});
