
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfigurableGenerator } from '../src/generators/ConfigurableGenerator.js';
import fs from 'fs-extra';
import select from '@inquirer/select';
import { join } from 'path';
import * as templateUtils from '../src/utils/template.js';

vi.mock('fs-extra');
vi.mock('@inquirer/select');
vi.mock('../src/utils/template.js');

describe('ConfigurableGenerator - Protocol Resolution', () => {
    const mockTargetDir = '/mock/target';
    const mockProjectRoot = '/mock/project/root';
    const mockTemplateRoot = '/mock/templates';
    
    const baseConfig = {
        agentType: 'test-agent',
        agentDir: '.test-agent',
        commandsDir: 'commands',
        displayName: 'Test Agent',
    };

    let originalCwd: () => string;

    beforeEach(() => {
        vi.resetAllMocks();
        originalCwd = process.cwd;
        process.cwd = vi.fn(() => mockProjectRoot);
        vi.mocked(templateUtils.getTemplateRoot).mockResolvedValue(mockTemplateRoot);
        vi.mocked(templateUtils.loadTemplate).mockResolvedValue([
            'description = "Test command"',
            'prompt = "Test prompt"',
        ].join('\n'));
        vi.mocked(fs.ensureDir).mockResolvedValue(undefined);
        vi.mocked(fs.copy).mockResolvedValue(undefined);
        vi.mocked(fs.writeFile).mockResolvedValue(undefined);
        vi.mocked(fs.existsSync).mockReturnValue(false);
    });

    afterEach(() => {
        process.cwd = originalCwd;
        vi.restoreAllMocks();
    });

    it('should copy GEMINI.md to protocolFilename in project root if configured', async () => {
        const config = { ...baseConfig, protocolFilename: 'TEST_PROTOCOL.md' };
        const generator = new ConfigurableGenerator(config);

        vi.mocked(fs.existsSync).mockImplementation((path) => {
            if (path === mockTargetDir) return true;
            if (path === join(mockTemplateRoot, 'GEMINI.md')) return true;
            if (path === join(mockProjectRoot, 'TEST_PROTOCOL.md')) return false;
            return false;
        });

        await generator.generate(mockTargetDir);

        expect(fs.copy).toHaveBeenCalledWith(
            join(mockTemplateRoot, 'GEMINI.md'),
            join(mockProjectRoot, 'TEST_PROTOCOL.md')
        );
    });

    it('should prompt for overwrite if protocol file exists', async () => {
        const config = { ...baseConfig, protocolFilename: 'EXISTING_PROTOCOL.md' };
        const generator = new ConfigurableGenerator(config);

        vi.mocked(fs.existsSync).mockImplementation((path) => {
            if (path === mockTargetDir) return true;
            if (path === join(mockTemplateRoot, 'GEMINI.md')) return true;
            if (path === join(mockProjectRoot, 'EXISTING_PROTOCOL.md')) return true;
            return false;
        });

        vi.mocked(select).mockResolvedValue(true as any);

        await generator.generate(mockTargetDir);

        expect(select).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.stringContaining('overwrite'),
        }));

        expect(fs.copy).toHaveBeenCalledWith(
            join(mockTemplateRoot, 'GEMINI.md'),
            join(mockProjectRoot, 'EXISTING_PROTOCOL.md')
        );
    });

    it('should skip copying if user declines overwrite', async () => {
        const config = { ...baseConfig, protocolFilename: 'SKIPPED_PROTOCOL.md' };
        const generator = new ConfigurableGenerator(config);

        vi.mocked(fs.existsSync).mockImplementation((path) => {
            if (path === mockTargetDir) return true;
            if (path === join(mockTemplateRoot, 'GEMINI.md')) return true;
            if (path === join(mockProjectRoot, 'SKIPPED_PROTOCOL.md')) return true;
            return false;
        });

        vi.mocked(select).mockResolvedValue(false as any);

        await generator.generate(mockTargetDir);

        expect(select).toHaveBeenCalled();

        expect(fs.copy).not.toHaveBeenCalledWith(
            join(mockTemplateRoot, 'GEMINI.md'),
            join(mockProjectRoot, 'SKIPPED_PROTOCOL.md')
        );
    });

    it('should NOT copy anything if protocolFilename is undefined', async () => {
        const config = { ...baseConfig, protocolFilename: undefined };
        const generator = new ConfigurableGenerator(config);

        vi.mocked(fs.existsSync).mockReturnValue(true);

        await generator.generate(mockTargetDir);
        
        expect(fs.copy).not.toHaveBeenCalledWith(
            join(mockTemplateRoot, 'GEMINI.md'),
            expect.any(String)
        );
    });
});
