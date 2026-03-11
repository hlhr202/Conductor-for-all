import { join } from 'path';
import select from '@inquirer/select';
import fs from 'fs-extra';
import { parse } from 'smol-toml';
import { loadTemplate, substituteVariables, getTemplateRoot } from '../utils/template.js';
import type { AgentConfig } from '../generators/types.js';
import { SkillsGenerator } from './types.js';

const { ensureDir, writeFile, copy, existsSync } = fs;

export abstract class BaseSkillsGenerator implements SkillsGenerator {
  constructor(protected readonly agentConfig?: Pick<AgentConfig, 'protocolFilename'>) {}

  protected abstract getSkillsBaseDir(targetDir: string): string;
  protected abstract getInstallPath(): string;

  protected getTemplateInstallPath(cmd: string): string {
    if (cmd === 'setup') {
      return `${this.getInstallPath()}/skills/conductor-setup`;
    }

    return this.getInstallPath();
  }

  async generate(targetDir: string): Promise<void> {
    const commands = ['setup', 'newTrack', 'implement', 'status', 'revert', 'review'];
    const skillsBaseDir = this.getSkillsBaseDir(targetDir);
    const templateRoot = await getTemplateRoot();

    if (this.agentConfig?.protocolFilename) {
      const templateProtocolSource = join(templateRoot, 'GEMINI.md');
      const protocolDest = join(targetDir, this.agentConfig.protocolFilename);

      if (existsSync(templateProtocolSource)) {
        let shouldCopy = true;

        if (existsSync(protocolDest)) {
          shouldCopy = await select({
            message: `The protocol file '${this.agentConfig.protocolFilename}' already exists. Do you want to overwrite it?`,
            choices: [
              { value: true, name: 'Overwrite' },
              { value: false, name: 'Skip' },
            ],
          });
        }

        if (shouldCopy) {
          await copy(templateProtocolSource, protocolDest);
        }
      }
    }

    for (const cmd of commands) {
      try {
        const tomlContent = await loadTemplate(`commands/${cmd}.toml`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsed = parse(tomlContent) as any;

        if (!parsed.prompt) {
          continue;
        }

        const skillName = `conductor-${cmd}`;
        const description = parsed.description || `Conductor ${cmd} command`;
        const installPath = this.getTemplateInstallPath(cmd);
        
        let prompt = parsed.prompt;
        prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
        
        // Use general as agent_type for skills
        const finalContent = substituteVariables(prompt, { agent_type: 'general' });

        const skillContent = `---
name: ${skillName}
description: ${description}
---

${finalContent}
`;

        const skillDir = join(skillsBaseDir, skillName);
        await ensureDir(skillDir);
        await writeFile(join(skillDir, 'SKILL.md'), skillContent);

        // Subclasses can hook in here to add extra files if needed
        await this.onSkillGenerated(skillDir, cmd);

      } catch (e) {
        console.warn(`Failed to process skill ${cmd}:`, e);
      }
    }
  }

  protected async onSkillGenerated(skillDir: string, cmd: string): Promise<void> {
    if (cmd === 'setup') {
      const templateRoot = await getTemplateRoot();
      const templateSrc = join(templateRoot, 'templates');
      const templateDest = join(skillDir, 'templates');
      await copy(templateSrc, templateDest);
    }
  }
}
