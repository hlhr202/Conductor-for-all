import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { normalizeWorkflowContent, normalizeWorkflowFilename } from '../../src/generators/utils.js';

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

  it('replaces colons on Windows', () => {
    const result = normalizeWorkflowFilename('conductor:setup.md');
    expect(result).toBe('conductor_setup.md');
  });

  it('keeps filename on non-Windows platforms', () => {
    setPlatform('darwin');
    const result = normalizeWorkflowFilename('conductor:setup.md');
    expect(result).toBe('conductor:setup.md');
  });

  it('replaces multiple colons on Windows', () => {
    const result = normalizeWorkflowFilename('prefix:middle:suffix.md');
    expect(result).toBe('prefix_middle_suffix.md');
  });

  it('returns unchanged filename without colons', () => {
    const result = normalizeWorkflowFilename('conductor_setup.md');
    expect(result).toBe('conductor_setup.md');
  });

  it('handles empty filename', () => {
    const result = normalizeWorkflowFilename('');
    expect(result).toBe('');
  });
});

describe('normalizeWorkflowContent', () => {
  beforeEach(() => {
    setPlatform('win32');
  });

  afterEach(() => {
    if (originalPlatform) {
      Object.defineProperty(process, 'platform', originalPlatform);
    }
  });

  it('replaces command references on Windows', () => {
    const content = 'Run /conductor:setup then see conductor:implement.md.';
    const result = normalizeWorkflowContent(content);
    expect(result).toBe('Run /conductor_setup then see conductor_implement.md.');
  });

  it('replaces command references with mixed separators', () => {
    const content = 'Use /conductor:setup_2 and conductor:review.';
    const result = normalizeWorkflowContent(content);
    expect(result).toBe('Use /conductor_setup_2 and conductor_review.');
  });

  it('keeps content on non-Windows platforms', () => {
    setPlatform('linux');
    const content = 'Run /conductor:setup then see conductor:implement.md.';
    const result = normalizeWorkflowContent(content);
    expect(result).toBe(content);
  });

  it('keeps content with non-matching conductor patterns', () => {
    const content = 'Run conductor:setup? then see conductor:.';
    const result = normalizeWorkflowContent(content);
    expect(result).toBe('Run conductor_setup? then see conductor:.');
  });

  it('handles empty content', () => {
    const result = normalizeWorkflowContent('');
    expect(result).toBe('');
  });
});
