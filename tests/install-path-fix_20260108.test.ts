
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyTemplateFiles } from '../src/utils/install.js';
import { writeFile } from 'fs-extra';
import { loadTemplate, getTemplateRoot } from '../src/utils/template.js';

vi.mock('fs-extra', () => {
  const mocks = {
    existsSync: vi.fn(),
    ensureDir: vi.fn(),
    writeFile: vi.fn(),
    copy: vi.fn(),
  };
  return {
    default: mocks,
    ...mocks,
  };
});

vi.mock('../src/utils/template.js', () => ({
  loadTemplate: vi.fn(),
  substituteVariables: (str: string, vars: any) => str.replace('{agent_type}', vars.agent_type),
  getTemplateRoot: vi.fn(),
}));

describe('Install Path Handling', () => {
  const targetDir = '/mock/target/dir';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should use relative path for installPath replacement', async () => {
    const consoleSpy = vi.spyOn(console, 'warn');
    const mockToml = 'prompt = """Path: __$$CODE_AGENT_INSTALL_PATH$$__"""';
    vi.mocked(loadTemplate).mockResolvedValue(mockToml);
    vi.mocked(getTemplateRoot).mockResolvedValue('/mock/install/path');

    await copyTemplateFiles(targetDir, 'opencode');

    if (consoleSpy.mock.calls.length > 0) {
        console.log('Captured warnings:', JSON.stringify(consoleSpy.mock.calls));
    }
    
    // We expect at least one write call (for one of the commands)
    expect(writeFile).toHaveBeenCalled();
    
    const writeCalls = vi.mocked(writeFile).mock.calls;
    // Check key content in one of the calls
    const content = writeCalls[0][1] as string;

    // Expectation: Should be relative path, NOT absolute
    expect(content).toContain('.opencode/conductor');
    expect(content).not.toContain('/mock/target/dir/.opencode/conductor');
    expect(content).toBe('Path: .opencode/conductor');
  });
});
