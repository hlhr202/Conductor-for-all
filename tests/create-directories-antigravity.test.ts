
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createConductorDirectories } from '../src/utils/install.js';
import { join } from 'path';
import fs from 'fs-extra';

vi.mock('fs-extra', () => {
  const mocks = {
    ensureDir: vi.fn(),
    existsSync: vi.fn(),
  };
  return {
    default: mocks,
    ...mocks,
  };
});

describe('Directory Creation', () => {
  const targetDir = '/mock/target/dir';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should create directories for antigravity agent', async () => {
    await createConductorDirectories(targetDir, 'antigravity');

    const expectedAgentPath = join(targetDir, '.agent');
    
    // Check for workflows directory
    expect(fs.ensureDir).toHaveBeenCalledWith(join(expectedAgentPath, 'workflows'));
    
    // Check for conductor directory
    expect(fs.ensureDir).toHaveBeenCalledWith(join(expectedAgentPath, 'conductor'));
  });
});
