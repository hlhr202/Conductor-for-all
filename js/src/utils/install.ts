import fs from 'fs-extra';
const { existsSync, ensureDir, writeFile, copy } = fs;
import { join } from 'path';
import { parse } from 'smol-toml';
import { loadTemplate, substituteVariables, getTemplateRoot } from './template.js';
import { AgentType } from '../types.js';

export async function validateProjectDirectory(targetDir: string): Promise<string> {
  if (!existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`);
  }

  const conductorDir = join(targetDir, 'conductor');
  if (existsSync(conductorDir)) {
    throw new Error(`Conductor is already installed in: ${targetDir}`);
  }

  return targetDir;
}

export async function createConductorDirectories(targetDir: string): Promise<void> {
  const opencodeDir = join(targetDir, '.opencode'); 
  await ensureDir(join(opencodeDir, 'commands'));
  await ensureDir(join(opencodeDir, 'conductor'));
  await ensureDir(join(targetDir, 'conductor'));
}

export async function copyTemplateFiles(targetDir: string, agentType: AgentType): Promise<void> {
  const commands = ['setup', 'newTrack', 'implement', 'status', 'revert'];
  const opencodeDir = join(targetDir, '.opencode'); 
  const commandsDir = join(opencodeDir, 'commands');

  const templateRoot = await getTemplateRoot();
  // __$$CODE_AGENT_INSTALL_PATH$$__ expects the path to the root of the install?
  // "run ls __$$CODE_AGENT_INSTALL_PATH$$__/templates/code_styleguides/"
  // If templateRoot is `gemini-conductor-codebase` (which has `templates/`),
  // then CODE_AGENT_INSTALL_PATH should be templateRoot.
  const installPath = join(targetDir, '.opencode', 'conductor');

  // Copy templates to .opencode/conductor/templates
  try {
     const templateSource = join(templateRoot, 'templates');
     const templateDest = join(opencodeDir, 'conductor', 'templates');
     await copy(templateSource, templateDest);
  } catch (e) {
     console.warn('Failed to copy templates directory:', e);
  }

  for (const cmd of commands) {
    try {
        const tomlContent = await loadTemplate(`commands/${cmd}.toml`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsed = parse(tomlContent) as any;
        
        if (!parsed.prompt) {
            console.warn(`Warning: No prompt found in ${cmd}.toml`);
            continue;
        }

        let prompt = parsed.prompt;
        
        prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$\__/g, installPath);
        
        const finalPrompt = substituteVariables(prompt, { agent_type: agentType });
        
        await writeFile(join(commandsDir, `conductor:${cmd}.md`), finalPrompt);
    } catch (e) {
        console.warn(`Failed to process ${cmd}:`, e);
    }
  }
}
