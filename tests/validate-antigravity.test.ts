
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateProjectDirectory } from '../src/utils/install.js';
import { join } from 'path';
import fs from 'fs-extra';

vi.mock('fs-extra', () => {
  const mocks = {
    existsSync: vi.fn(),
  };
  return {
    default: mocks,
    ...mocks,
  };
});

describe('Validation for Antigravity', () => {
  const targetDir = '/mock/target/dir';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should detect if antigravity is already installed', async () => {
    // Mock that everything exists
    vi.mocked(fs.existsSync).mockReturnValue(true);

    await expect(validateProjectDirectory(targetDir, 'antigravity'))
      .rejects.toThrow('Conductor (antigravity) is already installed');
      
    // Verify it checked the correct path
    // .agent/conductor and .agent/workflows/conductor:setup.toml
    expect(fs.existsSync).toHaveBeenCalledWith(join(targetDir, '.agent', 'conductor'));
    expect(fs.existsSync).toHaveBeenCalledWith(join(targetDir, '.agent', 'workflows', 'conductor:setup.toml'));
  });
});
