import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CodexGenerator } from '../../src/generators/index.js';
import fs from 'fs-extra';
import { homedir } from 'os';
import select from '@inquirer/select';

vi.mock('fs-extra');
vi.mock('os', () => ({
    homedir: vi.fn(),
}));
vi.mock('@inquirer/select');

vi.mock('../../src/utils/template.js', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = await importOriginal() as any;
    return {
        ...actual,
        loadTemplate: vi.fn(),
        getTemplateRoot: vi.fn(),
    };
});

import { loadTemplate, getTemplateRoot } from '../../src/utils/template.js';

describe('CodexGenerator', () => {
    let generator: CodexGenerator;
    const targetDir = '/mock/target';

    beforeEach(() => {
        vi.resetAllMocks();
        generator = new CodexGenerator();
        (getTemplateRoot as any).mockResolvedValue('/mock/template/root');
        (fs.existsSync as any).mockReturnValue(false);
        (select as any).mockResolvedValue(true);
    });

    describe('validate', () => {
        it('should return targetDir if valid', async () => {
            (fs.existsSync as any).mockImplementation((path: string) => path === targetDir);
            await expect(generator.validate(targetDir)).resolves.toBe(targetDir);
        });

        it('should throw if target directory does not exist', async () => {
             (fs.existsSync as any).mockReturnValue(false);
             await expect(generator.validate('/nonexistent')).rejects.toThrow('Target directory does not exist');
        });

        it('should throw if conductor is already installed', async () => {
            (fs.existsSync as any).mockReturnValue(true);
            await expect(generator.validate(targetDir)).rejects.toThrow('Conductor (Codex) is already installed');
        });

        it('should resolve to homedir if scope is global', async () => {
            (homedir as any).mockReturnValue('/mock/home');
            // Mock existsSync for homedir
            (fs.existsSync as any).mockImplementation((path: string) => {
                 if (path === '/mock/home') return true;
                 return false;
            });

            // We expect the generator to validate against homedir
            // Since we mocked existsSync to success for home, validation should pass returning home
            await expect(generator.validate('/any/path', 'global')).resolves.toBe('/mock/home');
        });
    });

    describe('generate', () => {
        it('should create directories and files', async () => {
             // Mock TOML content with valid format for smol-toml
             (loadTemplate as any).mockResolvedValue('prompt = "some prompt"');
             
             await generator.generate(targetDir);
             
             // Check for correct directory structure: .codex/prompts
             expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('.codex/prompts'));
             expect(fs.writeFile).toHaveBeenCalled();
        });

        it('should generate in homedir if scope is global', async () => {
             (homedir as any).mockReturnValue('/mock/home');
             (loadTemplate as any).mockResolvedValue('prompt = "some prompt"');
             (fs.existsSync as any).mockReturnValue(true); // target dir exists

             await generator.generate('/any/path', 'global');
             
             // Check that it tried to create directories in /mock/home/.codex/...
             expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('/mock/home/.codex'));
        });
    });
});
