import logger from './logger';
import { vi, describe, it, expect } from 'vitest';

vi.mock('winston', () => ({
  createLogger: vi.fn(() => ({
    info: vi.fn(),
    debug: vi.fn(),
    error: vi.fn(),
  })),
  format: {
    combine: vi.fn(),
    timestamp: vi.fn(),
    json: vi.fn(),
  },
  transports: {
    Console: vi.fn(),
    File: vi.fn(),
  },
}));

describe('Logger Module', () => {
  it('logs messages at the info level', () => {
    // Spy on the mocked `info` method
    logger.info('Test info message');

    expect(logger.info).toHaveBeenCalledWith('Test info message');
  });

  it('logs messages at the error level', () => {
    // Spy on the mocked `error` method
    logger.error('Test error message');

    expect(logger.error).toHaveBeenCalledWith('Test error message');
  });
});
