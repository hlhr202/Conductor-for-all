import fs from 'fs-extra';
const { existsSync, ensureDir, writeFile, copy } = fs;
import { join } from 'path';
import { parse } from 'smol-toml';
import { loadTemplate, substituteVariables, getTemplateRoot } from './template.js';
import { AgentType } from '../types.js';

export async function validateProjectDirectory(targetDir: string, agentType: AgentType): Promise<string> {
  if (!existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`);
  }

  const agentDir = agentType === 'claude-code' ? '.claude' : '.opencode';
  const agentPath = join(targetDir, agentDir);
  const conductorPath = join(agentPath, 'conductor');
  
  // Check if both the conductor directory and at least one command file exist
  const setupFile = join(agentPath, 'commands', 'conductor:setup.md');
  
  if (existsSync(conductorPath) && existsSync(setupFile)) {
    throw new Error(`Conductor (${agentType}) is already installed in: ${targetDir}`);
  }

  return targetDir;
}

export async function createConductorDirectories(targetDir: string, agentType: AgentType): Promise<void> {
  const agentDir = agentType === 'claude-code' ? '.claude' : '.opencode';
  const agentPath = join(targetDir, agentDir); 
  await ensureDir(join(agentPath, 'commands'));
  await ensureDir(join(agentPath, 'conductor'));
}

export async function copyTemplateFiles(targetDir: string, agentType: AgentType): Promise<void> {
  const commands = ['setup', 'newTrack', 'implement', 'status', 'revert'];
  const agentDir = agentType === 'claude-code' ? '.claude' : '.opencode';
  const agentPath = join(targetDir, agentDir); 
  const commandsDir = join(agentPath, 'commands');

  const templateRoot = await getTemplateRoot();
  // __$$CODE_AGENT_INSTALL_PATH$$__ expects the path to the root of the install?
  // "run ls __$$CODE_AGENT_INSTALL_PATH$$__/templates/code_styleguides/"
  // If templateRoot is `gemini-conductor-codebase` (which has `templates/`),
  // then CODE_AGENT_INSTALL_PATH should be templateRoot.
  const installPath = join(targetDir, agentDir, 'conductor');

  // Copy templates to agent directory
  try {
     const templateSource = join(templateRoot, 'templates');
     const templateDest = join(agentPath, 'conductor', 'templates');
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
        
        prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
        
        const finalPrompt = substituteVariables(prompt, { agent_type: agentType });
        
        await writeFile(join(commandsDir, `conductor:${cmd}.md`), finalPrompt);
    } catch (e) {
        console.warn(`Failed to process ${cmd}:`, e);
    }
  }
}
