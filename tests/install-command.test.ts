import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installHandler } from '../src/commands/install.js';
import * as promptModule from '../src/cli/prompt.js';
import * as installUtils from '../src/utils/install.js';

vi.mock('../src/cli/prompt.js');
vi.mock('../src/utils/install.js');

describe('Install Command', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should run successful installation flow', async () => {
    // Setup mocks
    const mockArgv = { path: '.', _: [], $0: 'conductor' };
    vi.mocked(installUtils.validateProjectDirectory).mockResolvedValue('/abs/path');
    vi.mocked(promptModule.promptForAgent).mockResolvedValue('opencode');
    
    // Execute
    await installHandler(mockArgv);
    
    // Verify flow
    expect(installUtils.validateProjectDirectory).toHaveBeenCalled();
    expect(promptModule.promptForAgent).toHaveBeenCalled();
    expect(installUtils.createConductorDirectories).toHaveBeenCalledWith('/abs/path', 'opencode');
    expect(installUtils.copyTemplateFiles).toHaveBeenCalledWith('/abs/path', 'opencode');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('initialized successfully'));
  });

  it('should handle validation errors', async () => {
    // Setup mocks
    const mockArgv = { path: '.', _: [], $0: 'conductor' };
    vi.mocked(installUtils.validateProjectDirectory).mockRejectedValue(new Error('Validation failed'));
    
    // Execute
    await installHandler(mockArgv);
    
    // Verify error handling
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Installation failed'), 'Validation failed');
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(installUtils.createConductorDirectories).not.toHaveBeenCalled();
  });
});
