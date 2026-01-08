import { ArgumentsCamelCase } from 'yargs';
import { promptForAgent } from '../cli/prompt.js';
import { validateProjectDirectory, createConductorDirectories, copyTemplateFiles } from '../utils/install.js';
import { resolve } from 'path';

export async function installHandler(argv: ArgumentsCamelCase<{ path: string }>): Promise<void> {
  // Resolve target directory to absolute path
  const targetDir = resolve(process.cwd(), argv.path);
  
  try {
    console.log(`Initializing Conductor in: ${targetDir}`);
    
    // 1. Validate
    const validatedPath = await validateProjectDirectory(targetDir);
    
    // 2. Select Agent
    const agent = await promptForAgent();
    console.log(`Selected agent: ${agent}`);
    
    // 3. Create Directories
    await createConductorDirectories(validatedPath);
    
    // 4. Copy Templates
    await copyTemplateFiles(validatedPath, agent);
    
    console.log('✔ Conductor initialized successfully!');
  } catch (err) {
    console.error('✘ Installation failed:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
