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

  let agentDir: string;
  let setupFile: string;

  if (agentType === 'claude-code') {
    agentDir = '.claude';
     setupFile = join(targetDir, agentDir, 'commands', 'conductor:setup.md');
  } else if (agentType === 'antigravity') {
    agentDir = '.agent';
    setupFile = join(targetDir, agentDir, 'workflows', 'conductor-setup.md');
  } else {
    agentDir = '.opencode';
    setupFile = join(targetDir, agentDir, 'commands', 'conductor:setup.md');
  }

  const agentPath = join(targetDir, agentDir);
  const conductorPath = join(agentPath, 'conductor');
  
  if (existsSync(conductorPath) && existsSync(setupFile)) {
    throw new Error(`Conductor (${agentType}) is already installed in: ${targetDir}`);
  }

  return targetDir;
}

export async function createConductorDirectories(targetDir: string, agentType: AgentType): Promise<void> {
  let agentDir: string;
  let commandsDir: string;

  if (agentType === 'claude-code') {
    agentDir = '.claude';
    commandsDir = 'commands';
  } else if (agentType === 'antigravity') {
    agentDir = '.agent';
    commandsDir = 'workflows';
  } else {
    agentDir = '.opencode';
    commandsDir = 'commands';
  }

  const agentPath = join(targetDir, agentDir); 
  await ensureDir(join(agentPath, commandsDir));
  await ensureDir(join(agentPath, 'conductor'));
}

export async function copyTemplateFiles(targetDir: string, agentType: AgentType): Promise<void> {
  const commands = ['setup', 'newTrack', 'implement', 'status', 'revert'];
  let agentDir: string;
  let commandsDir: string;

  if (agentType === 'claude-code') {
    agentDir = '.claude';
    commandsDir = 'commands';
  } else if (agentType === 'antigravity') {
    agentDir = '.agent';
    commandsDir = 'workflows';
  } else {
    agentDir = '.opencode';
    commandsDir = 'commands';
  }

  const agentPath = join(targetDir, agentDir); 
  const targetCommandsDir = join(agentPath, commandsDir);

  const templateRoot = await getTemplateRoot();
  const installPath = join(agentDir, 'conductor');

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

        let finalContent: string;
        let fileName: string;

    if (agentType === 'antigravity') {
        // For Antigravity, we parse TOML, extract prompt, and write to .md
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsed = parse(tomlContent) as any;
        
        if (!parsed.prompt) {
             console.warn(`Warning: No prompt found in ${cmd}.toml`);
             continue;
        }

        let prompt = parsed.prompt;
        prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
        finalContent = substituteVariables(prompt, { agent_type: agentType });
        // Use hyphen for antigravity as per spec
        fileName = `conductor-${cmd}.md`;
    } else {
         // For/claude/opencode, we parse TOML and extract 'prompt'
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const parsed = parse(tomlContent) as any;
         
         if (!parsed.prompt) {
             console.warn(`Warning: No prompt found in ${cmd}.toml`);
             continue;
         }
 
         let prompt = parsed.prompt;
         prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
         finalContent = substituteVariables(prompt, { agent_type: agentType });
         fileName = `conductor:${cmd}.md`;
    }
        
        await writeFile(join(targetCommandsDir, fileName), finalContent);
    } catch (e) {
        console.warn(`Failed to process ${cmd}:`, e);
    }
  }
}
