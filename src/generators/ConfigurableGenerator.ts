import { join } from 'path';
import select from '@inquirer/select';
import fs from 'fs-extra';
import { parse } from 'smol-toml';
import type { AgentGenerator, AgentConfig } from './types.js';
import type { InstallScope } from '../types.js';
import { getTemplateRoot, loadTemplate } from '../utils/template.js';
import { defaultContentStrategy, defaultFileStrategy } from './default/index.js';
import { normalizeWorkflowFilename } from './utils.js';

const { existsSync, ensureDir, writeFile, copy } = fs;


/**
 * A generator that uses configuration to produce agent-specific output.
 * This class implements AgentGenerator interface using a config-driven approach.
 */
export class ConfigurableGenerator implements AgentGenerator {
    constructor(private readonly config: AgentConfig) {}

    async validate(targetDir: string, scope?: InstallScope): Promise<string> {
        if (!existsSync(targetDir)) {
            throw new Error(`Target directory does not exist: ${targetDir}`);
        }

        const { agentDir, commandsDir, displayName } = this.config;
        const setupFileName = normalizeWorkflowFilename('conductor:setup.md', commandsDir);
        const setupFile = join(targetDir, agentDir, commandsDir, setupFileName);
        const conductorPath = join(targetDir, agentDir, 'conductor');

        if (existsSync(conductorPath) && existsSync(setupFile)) {
            throw new Error(`Conductor (${displayName}) is already installed in: ${targetDir}`);
        }

        return targetDir;
    }

    async generate(targetDir: string, scope?: InstallScope): Promise<void> {
        const { agentDir, commandsDir, agentType } = this.config;
        const agentPath = join(targetDir, agentDir);
        const targetCommandsDir = join(agentPath, commandsDir);
        
        // Determine installation path string used in templates
        // For project-level: relative path (e.g., ".codex/conductor")
        // For global-level: absolute/home path (e.g., "~/.codex/conductor")
        let installPath = join(agentDir, 'conductor');
        if (scope === 'global') {
             // Assuming agentDir doesn't start with / or ~
             installPath = `~/${agentDir}/conductor`;
        }

        await ensureDir(targetCommandsDir);
        await ensureDir(join(agentPath, 'conductor'));

        const templateRoot = await getTemplateRoot();
        try {
            const templateSource = join(templateRoot, 'templates');
            const templateDest = join(agentPath, 'conductor', 'templates');
            await copy(templateSource, templateDest);
        } catch (e) {
            console.warn('Failed to copy templates directory:', e);
        }

        const { protocolFilename } = this.config;
        if (protocolFilename) {
            try {
                const protocolSource = join(templateRoot, 'GEMINI.md');
                const protocolDest = join(targetDir, protocolFilename);

                if (existsSync(protocolSource)) {
                    let shouldCopy = true;
                    if (existsSync(protocolDest)) {
                         shouldCopy = await select({
                            message: `The protocol file '${protocolFilename}' already exists. Do you want to overwrite it?`,
                            choices: [
                                { value: true, name: 'Overwrite' },
                                { value: false, name: 'Skip' }
                            ]
                        });
                    }

                    if (shouldCopy) {
                        await copy(protocolSource, protocolDest);
                    }
                }
            } catch (e) {
                console.warn('Failed to handle protocol file:', e);
            }
        }

        const commands = ['setup', 'newTrack', 'implement', 'status', 'revert', 'review'];
        const extension = this.config.extension || '.md';
        const fixedAgent = this.config.fixedAgent;

        for (const cmd of commands) {
            try {
                const tomlContent = await loadTemplate(`commands/${cmd}.toml`);
                
                const contentStrategy = this.config.strategy?.content || defaultContentStrategy;
                const finalContent = contentStrategy.process(tomlContent, {
                    installPath,
                    agentType,
                    commandsDir,
                    fixedAgent,
                    commandName: cmd
                });

                if (finalContent) {
                    const fileStrategy = this.config.strategy?.file || defaultFileStrategy;
                    await fileStrategy.write({
                        targetDir,
                        agentDir,
                        commandsDir,
                        commandName: cmd,
                        extension,
                        content: finalContent
                    });
                }
            } catch (e) {
                console.warn(`Failed to process ${cmd}:`, e);
            }
        }
    }
}
