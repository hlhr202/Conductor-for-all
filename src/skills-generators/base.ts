import { join } from 'path';
import fs from 'fs-extra';
import { parse } from 'smol-toml';
import { loadTemplate, substituteVariables, getTemplateRoot } from '../utils/template.js';
import { SkillsGenerator } from './types.js';

const { ensureDir, writeFile, copy } = fs;

export abstract class BaseSkillsGenerator implements SkillsGenerator {
  protected abstract getSkillsBaseDir(targetDir: string): string;
  protected abstract getInstallPath(): string;

  async generate(targetDir: string): Promise<void> {
    const commands = ['setup', 'newTrack', 'implement', 'status', 'revert', 'review'];
    const skillsBaseDir = this.getSkillsBaseDir(targetDir);
    const installPath = this.getInstallPath();

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
