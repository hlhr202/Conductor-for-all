import { ArgumentsCamelCase } from 'yargs';
import { promptForAgent } from '../cli/prompt.js';
import { validateProjectDirectory, createConductorDirectories, copyTemplateFiles } from '../utils/install.js';
import { resolve } from 'path';

export async function installHandler(argv: ArgumentsCamelCase<{ path: string }>): Promise<void> {
  // Resolve target directory to absolute path
  const targetDir = resolve(process.cwd(), argv.path);
  
  try {
    console.log(`Initializing Conductor in: ${targetDir}`);
    
    // 1. Select Agent
    console.log('Step 1: Prompting for agent selection...');
    const agent = await promptForAgent();
    console.log(`✔ Selected agent: ${agent}`);

    // 2. Validate
    console.log('\nStep 2: Validating project directory...');
    const validatedPath = await validateProjectDirectory(targetDir, agent);
    console.log(`✔ Validation complete: ${validatedPath}`);
    
    // 3. Create Directories
    console.log('\nStep 3: Creating Conductor directories...');
    await createConductorDirectories(validatedPath, agent);
    console.log('✔ Directories created');
    
    // 4. Copy Templates
    console.log('\nStep 4: Copying template files...');
    await copyTemplateFiles(validatedPath, agent);
    console.log('✔ Templates copied');
    
    console.log('\n✔ Conductor initialized successfully!');
  } catch (err) {
    console.error('\n✘ Installation failed:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
