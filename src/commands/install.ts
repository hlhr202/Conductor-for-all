
import { ArgumentsCamelCase } from 'yargs';
import { promptForAgent, promptForInstallScope, promptForInstallMode, promptForSkillsTarget } from '../cli/prompt.js';
import { getGenerator, getGeneratorConfig } from '../generators/index.js';
import { getSkillsGenerator } from '../skills-generators/index.js';
import { resolve } from 'path';

import { AgentType, PromptAgentType } from '../types.js';

export async function installHandler(argv: ArgumentsCamelCase<{ path: string; agent?: string }>): Promise<void> {
  // Resolve target directory to absolute path
  const targetDir = resolve(process.cwd(), argv.path);
  
  try {
    console.log(`Initializing Conductor in: ${targetDir}`);

    const installMode = await promptForInstallMode();

    if (installMode === 'skills') {
      console.log('Step 1: Prompting for skills target selection...');
      const target = await promptForSkillsTarget();
      console.log(`✔ Selected skills target: ${target}`);

      const selectedAgent: AgentType = target === 'claude-code' ? 'claude-code' : 'opencode';
      const agentConfig = getGeneratorConfig(selectedAgent);
      const skillsGenerator = getSkillsGenerator(target, agentConfig);
      console.log('\nStep 2: Generating skills...');
      await skillsGenerator.generate(targetDir);

      console.log('\n✔ Conductor skills initialized successfully!');
      return;
    }
    
    // 1. Select Agent
    let agent: PromptAgentType;
    if (argv.agent) {
      agent = argv.agent as PromptAgentType;
      console.log(`Using provided agent: ${agent}`);
    } else {
      console.log('Step 1: Prompting for agent selection...');
      agent = await promptForAgent();
      console.log(`✔ Selected agent: ${agent}`);
    }

    // 2. Select Installation Scope
    const scope = await promptForInstallScope(agent);
    console.log(`✔ Selected scope: ${scope}`);

    const generator = getGenerator(agent);

    // 3. Validate
    console.log('\nStep 3: Validating project directory...');
    const validatedPath = await generator.validate(targetDir, scope);
    console.log(`✔ Validation complete: ${validatedPath}`);
    
    // 4. Generate
    console.log('\nStep 4: Generating files...');
    await generator.generate(validatedPath, scope);
    console.log('✔ Files generated');
    
    console.log('\n✔ Conductor initialized successfully!');
  } catch (err) {
    console.error('\n✘ Installation failed:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
