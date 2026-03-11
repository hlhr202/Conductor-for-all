
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installHandler } from '../src/commands/install.js';
import * as promptModule from '../src/cli/prompt.js';
import * as generatorFactory from '../src/generators/index.js';
import * as skillsGeneratorFactory from '../src/skills-generators/index.js';
import { geminiConfig } from '../src/generators/gemini/index.js';

vi.mock('../src/cli/prompt.js');
vi.mock('../src/generators/index.js', () => ({
    getGenerator: vi.fn(),
    getGeneratorConfig: vi.fn(),
}));

vi.mock('../src/skills-generators/index.js', () => ({
    getSkillsGenerator: vi.fn(),
}));

describe('Install Command', () => {
  const mockGenerator = {
      validate: vi.fn(),
      generate: vi.fn(),
  };

  const mockSkillsGenerator = {
      generate: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    (generatorFactory.getGenerator as any).mockReturnValue(mockGenerator);
    (generatorFactory.getGeneratorConfig as any).mockReturnValue({ protocolFilename: 'AGENTS.md' });
    (skillsGeneratorFactory.getSkillsGenerator as any).mockReturnValue(mockSkillsGenerator);
    
    // Default mocks for prompt mode to keep existing tests green
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('prompt');
  });

  it('should run successful installation flow using generator', async () => {
    // Setup mocks
    const mockArgv = { path: '.', _: [], $0: 'conductor' };
    mockGenerator.validate.mockResolvedValue('/abs/path');
    vi.mocked(promptModule.promptForAgent).mockResolvedValue('opencode');
    // Mock scope selection
    vi.mocked(promptModule.promptForInstallScope).mockResolvedValue('project');
    
    // Execute
    await installHandler(mockArgv);
    
    // Verify flow
    expect(promptModule.promptForInstallMode).toHaveBeenCalled();
    expect(generatorFactory.getGenerator).toHaveBeenCalledWith('opencode');
    // Check that validate and generate are called with scope
    expect(mockGenerator.validate).toHaveBeenCalledWith(expect.any(String), 'project'); 
    expect(mockGenerator.generate).toHaveBeenCalledWith('/abs/path', 'project');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('initialized successfully'));
  });

  it('should use agent from CLI if provided and default to prompt mode', async () => {
    // Setup mocks
    const mockArgv = { path: '.', agent: 'cursor', _: [], $0: 'conductor' };
    mockGenerator.validate.mockResolvedValue('/abs/path');
    // Mock scope selection
    vi.mocked(promptModule.promptForInstallScope).mockResolvedValue('project');
    
    // Execute
    await installHandler(mockArgv as any);
    
    // Verify flow - promptForAgent should NOT be called
    expect(promptModule.promptForInstallMode).toHaveBeenCalled();
    expect(promptModule.promptForAgent).not.toHaveBeenCalled();
    expect(generatorFactory.getGenerator).toHaveBeenCalledWith('cursor');
    // Verify promptForInstallScope is still called even if agent is provided by flag
    expect(promptModule.promptForInstallScope).toHaveBeenCalledWith('cursor');
    expect(mockGenerator.generate).toHaveBeenCalledWith(expect.any(String), 'project');
  });

  it('should handle validation errors', async () => {
    // Setup mocks
    const mockArgv = { path: '.', _: [], $0: 'conductor' };
    mockGenerator.validate.mockRejectedValue(new Error('Validation failed'));
    vi.mocked(promptModule.promptForAgent).mockResolvedValue('opencode');
    
    // Execute
    await installHandler(mockArgv);
    
    // Verify error handling
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Installation failed'), 'Validation failed');
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(mockGenerator.generate).not.toHaveBeenCalled();
  });

  it('should run successful installation flow for Gemini CLI', async () => {
    // Setup mocks
    const mockArgv = { path: '.', agent: 'gemini', _: [], $0: 'conductor' };
    mockGenerator.validate.mockResolvedValue('/abs/path');
    vi.mocked(promptModule.promptForInstallScope).mockResolvedValue('project');
    
    // Execute
    await installHandler(mockArgv as any);
    
    // Verify flow
    expect(generatorFactory.getGenerator).toHaveBeenCalledWith('gemini');
    expect(mockGenerator.validate).toHaveBeenCalledWith(expect.any(String), 'project'); 
    expect(mockGenerator.generate).toHaveBeenCalledWith('/abs/path', 'project');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('initialized successfully'));
  });

  it('should branch into skills mode when selected', async () => {
    // Setup mocks
    const mockArgv = { path: '.', _: [], $0: 'conductor' };
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('skills');
    vi.mocked(promptModule.promptForSkillsTarget).mockResolvedValue('general');
    
    // Execute
    await installHandler(mockArgv);
    
    // Verify flow branches to skills
    expect(promptModule.promptForInstallMode).toHaveBeenCalled();
    expect(promptModule.promptForSkillsTarget).toHaveBeenCalled();
    
    // Verify prompt mode prompts were skipped
    expect(promptModule.promptForAgent).not.toHaveBeenCalled();
    expect(promptModule.promptForInstallScope).not.toHaveBeenCalled();
    expect(skillsGeneratorFactory.getSkillsGenerator).toHaveBeenCalledWith('general', expect.any(Object));
    expect(mockSkillsGenerator.generate).toHaveBeenCalled();
  });

  it('should pass the selected agent config into skills generation', async () => {
    const mockArgv = { path: '.', agent: 'gemini', _: [], $0: 'conductor' };
    vi.mocked(promptModule.promptForInstallMode).mockResolvedValue('skills');
    vi.mocked(promptModule.promptForSkillsTarget).mockResolvedValue('general');
    (generatorFactory.getGeneratorConfig as any).mockReturnValue(geminiConfig);

    await installHandler(mockArgv as any);

    expect(generatorFactory.getGeneratorConfig).toHaveBeenCalledWith('gemini');
    expect(skillsGeneratorFactory.getSkillsGenerator).toHaveBeenCalledWith('general', geminiConfig);
  });
});
