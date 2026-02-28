import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfigurableGenerator } from '../../src/generators/ConfigurableGenerator.js';
import type { AgentConfig } from '../../src/generators/types.js';
import fs from 'fs-extra';
import select from '@inquirer/select';

vi.mock('fs-extra');
vi.mock('@inquirer/select');

vi.mock('../../src/utils/template.js', async (importOriginal) => {
    const actual = await importOriginal() as Record<string, unknown>;
    return {
        ...actual,
        loadTemplate: vi.fn(),
        getTemplateRoot: vi.fn(),
    };
});

import { loadTemplate, getTemplateRoot } from '../../src/utils/template.js';

describe('ConfigurableGenerator', () => {
    const mockConfig: AgentConfig = {
        agentType: 'test-agent',
        agentDir: '.test',
        commandsDir: 'commands',
        displayName: 'Test Agent',
    };
    const targetDir = '/mock/target';
    let generator: ConfigurableGenerator;

    beforeEach(() => {
        vi.resetAllMocks();
        generator = new ConfigurableGenerator(mockConfig);
        (getTemplateRoot as ReturnType<typeof vi.fn>).mockResolvedValue('/mock/template/root');
        (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(false);
    });

    describe('validate', () => {
        it('should return targetDir if valid', async () => {
            (fs.existsSync as ReturnType<typeof vi.fn>).mockImplementation(
                (path: string) => path === targetDir
            );
            await expect(generator.validate(targetDir)).resolves.toBe(targetDir);
        });

        it('should throw if target directory does not exist', async () => {
            (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(false);
            await expect(generator.validate('/nonexistent')).rejects.toThrow(
                'Target directory does not exist'
            );
        });

        it('should throw if conductor is already installed', async () => {
            (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(true);
            await expect(generator.validate(targetDir)).rejects.toThrow(
                `Conductor (${mockConfig.displayName}) is already installed`
            );
        });

        it('should use displayName in error messages', async () => {
            (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(true);
            await expect(generator.validate(targetDir)).rejects.toThrow('Test Agent');
        });
    });

    describe('generate', () => {
        it('should create directories based on config', async () => {
            (loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue('prompt = "some prompt"');

            await generator.generate(targetDir);

            expect(fs.ensureDir).toHaveBeenCalledWith(
                expect.stringContaining('.test/commands')
            );
            expect(fs.ensureDir).toHaveBeenCalledWith(
                expect.stringContaining('.test/conductor')
            );
        });

        it('should write command files', async () => {
            (loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue('prompt = "some prompt"');

            await generator.generate(targetDir);

            expect(fs.writeFile).toHaveBeenCalled();
        });

        it('should copy template directory', async () => {
            (loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue('prompt = "some prompt"');

            await generator.generate(targetDir);

            expect(fs.copy).toHaveBeenCalledWith(
                expect.stringContaining('templates'),
                expect.stringContaining('.test/conductor/templates')
            );
        });

        it('should include review command in generated commands', async () => {
            (loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue('prompt = "some prompt"');

            await generator.generate(targetDir);

            const writeFileCalls = (fs.writeFile as unknown as ReturnType<typeof vi.fn>).mock.calls;
            const reviewCommandCall = writeFileCalls.find((call: unknown[]) => 
                call[0] && typeof call[0] === 'string' && call[0].includes('review')
            );
            expect(reviewCommandCall).toBeDefined();
        });
    });

    describe('command list', () => {
        it('should include review command in the commands array', async () => {
            (loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue('prompt = "some prompt"');

            await generator.generate(targetDir);

            const expectedCommands = ['setup', 'newTrack', 'implement', 'status', 'revert', 'review'];
            for (const cmd of expectedCommands) {
                expect(loadTemplate).toHaveBeenCalledWith(`commands/${cmd}.toml`);
            }
        });
    });

    describe('protocol file output', () => {
        const configWithProtocol: AgentConfig = {
            ...mockConfig,
            protocolFilename: 'AGENTS.md',
        };
        const originalCwd = process.cwd;

        beforeEach(() => {
            vi.resetAllMocks();
            generator = new ConfigurableGenerator(configWithProtocol);
            (getTemplateRoot as ReturnType<typeof vi.fn>).mockResolvedValue('/mock/template/root');
            (fs.existsSync as ReturnType<typeof vi.fn>).mockReturnValue(false);
            (loadTemplate as ReturnType<typeof vi.fn>).mockResolvedValue('prompt = "some prompt"');
        });

        afterEach(() => {
            process.cwd = originalCwd;
        });

        it('should write protocol file to process.cwd() when scope is global', async () => {
            const mockCwd = '/project/root';
            const homedir = '/Users/testuser';
            process.cwd = vi.fn(() => mockCwd);
            (fs.existsSync as ReturnType<typeof vi.fn>).mockImplementation(
                (path: string) => path === '/mock/template/root/GEMINI.md'
            );

            await generator.generate(homedir, 'global');

            expect(fs.copy).toHaveBeenCalledWith(
                expect.stringContaining('GEMINI.md'),
                expect.stringContaining(mockCwd)
            );
            expect(fs.copy).toHaveBeenCalledWith(
                expect.any(String),
                expect.not.stringContaining(homedir)
            );
        });

        it('should write protocol file to process.cwd() when scope is project', async () => {
            const mockCwd = '/project/root';
            process.cwd = vi.fn(() => mockCwd);
            (fs.existsSync as ReturnType<typeof vi.fn>).mockImplementation(
                (path: string) => path === '/mock/template/root/GEMINI.md'
            );

            await generator.generate(targetDir, 'project');

            expect(fs.copy).toHaveBeenCalledWith(
                expect.stringContaining('GEMINI.md'),
                expect.stringContaining(mockCwd)
            );
        });

        it('should prompt for overwrite when protocol file exists at project root', async () => {
            const mockCwd = '/project/root';
            process.cwd = vi.fn(() => mockCwd);
            (fs.existsSync as ReturnType<typeof vi.fn>).mockImplementation(
                (path: string) => 
                    path === '/mock/template/root/GEMINI.md' || 
                    path === `${mockCwd}/AGENTS.md`
            );
            (select as ReturnType<typeof vi.fn>).mockResolvedValue(true);

            await generator.generate(targetDir, 'global');

            expect(select).toHaveBeenCalled();
        });
    });
});
