import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { normalizeWorkflowFilename } from '../../src/generators/utils.js';

const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');

const setPlatform = (platform: string) => {
  Object.defineProperty(process, 'platform', {
    value: platform,
    configurable: true,
  });
};

describe('normalizeWorkflowFilename', () => {
  beforeEach(() => {
    setPlatform('win32');
  });

  afterEach(() => {
    if (originalPlatform) {
      Object.defineProperty(process, 'platform', originalPlatform);
    }
  });

  it('replaces colons on Windows when commandsDir includes workflows', () => {
    const result = normalizeWorkflowFilename('conductor:setup.md', 'workflows');
    expect(result).toBe('conductor_setup.md');
  });

  it('keeps filename on Windows when commandsDir does not include workflows', () => {
    const result = normalizeWorkflowFilename('conductor:setup.md', 'commands');
    expect(result).toBe('conductor:setup.md');
  });

  it('keeps filename on non-Windows platforms', () => {
    setPlatform('darwin');
    const result = normalizeWorkflowFilename('conductor:setup.md', 'workflows');
    expect(result).toBe('conductor:setup.md');
  });
});
