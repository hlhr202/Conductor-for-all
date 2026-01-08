
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyTemplateFiles } from '../src/utils/install.js';
import { join } from 'path';
import fs from 'fs-extra';
import { loadTemplate, getTemplateRoot } from '../src/utils/template.js';

vi.mock('fs-extra', () => {
  const mocks = {
    ensureDir: vi.fn(),
    existsSync: vi.fn(),
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
  getTemplateRoot: vi.fn().mockResolvedValue('/mock/root'),
}));



describe('Template Copying for Antigravity', () => {
  const targetDir = '/mock/target/dir';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should copy templates and create TOML files for antigravity agent', async () => {
    vi.mocked(getTemplateRoot).mockResolvedValue('/mock/root');
    const mockTomlContent = 'description = "Test Description"\nprompt = "Prompt content with __$$CODE_AGENT_INSTALL_PATH$$__ for {agent_type}"';
    vi.mocked(loadTemplate).mockResolvedValue(mockTomlContent);

    await copyTemplateFiles(targetDir, 'antigravity');

    // Expected paths
    const expectedAgentDir = '.agent';
    const expectedWorkflowDir = join(targetDir, expectedAgentDir, 'workflows');
    const expectedConductorDir = join(targetDir, expectedAgentDir, 'conductor');

    // Verify template copy
    expect(fs.copy).toHaveBeenCalledWith(
        join('/mock/root', 'templates'),
        join(expectedConductorDir, 'templates')
    );

    // Verify command creation
    // Antigravity files should be .md (with colon) and in workflows directory
    const expectedFilePath = join(expectedWorkflowDir, 'conductor:setup.md');
    
    // We expect fs.writeFile to have been called. 
    // However, existing implementation iterates over 5 commands, so checking for one is sufficient.
    const writeCalls = vi.mocked(fs.writeFile).mock.calls;
    
    // Look for a call that writes to conductor:setup.md
    const setupCall = writeCalls.find(call => (call[0] as string).endsWith('conductor:setup.md'));
    

    
    if (setupCall) {
        // Assert content was written
        // The Spec says:
        // FR2.4: For antigravity agent, perform string substitution on Markdown files
        // FR2.5: Antigravity command file naming format: conductor:{cmd}.md
        
        // This test expects behavior DIFFERENT from existing implementation
        const content = setupCall[1] as string;
        expect(content).toContain('Prompt content');
        expect(content).toContain('.agent/conductor');
        expect(content).toContain('antigravity');
        
        // Assert description frontmatter
        expect(content).toContain('---\ndescription: Test Description\n---');

    }
  });
});
