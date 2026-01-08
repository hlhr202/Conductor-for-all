import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateProjectDirectory, createConductorDirectories, copyTemplateFiles } from '../src/utils/install.js';
import { existsSync, ensureDir, writeFile } from 'fs-extra';
import { join } from 'path';
import { loadTemplate, getTemplateRoot } from '../src/utils/template.js';

vi.mock('fs-extra', () => {
  const mocks = {
    existsSync: vi.fn(),
    ensureDir: vi.fn(),
    writeFile: vi.fn(),
  };
  return {
    default: mocks,
    ...mocks,
  };
});

vi.mock('../src/utils/template.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/utils/template.js')>();
  return {
    ...actual,
    loadTemplate: vi.fn(),
    getTemplateRoot: vi.fn(),
  };
});

describe('Install Utils', () => {
  const targetDir = '/mock/target/dir';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('validateProjectDirectory', () => {
    it('should return path if valid', async () => {
      vi.mocked(existsSync).mockImplementation((path) => {
        if (path === targetDir) return true;
        if (path === join(targetDir, 'conductor')) return false;
        return false;
      });

      const result = await validateProjectDirectory(targetDir);
      expect(result).toBe(targetDir);
    });

    it('should throw if target dir missing', async () => {
      vi.mocked(existsSync).mockReturnValue(false);
      await expect(validateProjectDirectory(targetDir)).rejects.toThrow('does not exist');
    });

    it('should throw if conductor already installed', async () => {
      vi.mocked(existsSync).mockReturnValue(true);
      await expect(validateProjectDirectory(targetDir)).rejects.toThrow('already installed');
    });
    describe('copyTemplateFiles', () => {
    it('should copy and process templates', async () => {
      const mockToml = 'prompt = """Hello {agent_type}, install path is __$$CODE_AGENT_INSTALL_PATH$$__"""';
      vi.mocked(loadTemplate).mockResolvedValue(mockToml);
      vi.mocked(getTemplateRoot).mockResolvedValue('/mock/install/path');
      
      await copyTemplateFiles(targetDir, 'opencode');
      
      expect(writeFile).toHaveBeenCalled();
      // Verify replacement
      const writeCall = vi.mocked(writeFile).mock.calls[0];
      const content = writeCall[1] as string;
      expect(content).toContain('Hello opencode');
      // expect(content).toContain('/mock/install/path'); // Replaced by local path logic
      expect(content).toContain('.opencode/conductor');
      expect(content).not.toContain('__$$CODE_AGENT_INSTALL_PATH$$__');
    });
  });
});

  describe('createConductorDirectories', () => {
    it('should create directories', async () => {
      await createConductorDirectories(targetDir);
      expect(ensureDir).toHaveBeenCalledTimes(2); 
      expect(ensureDir).toHaveBeenCalledWith(expect.stringContaining('.opencode/commands'));
    });
  });
});
