import { join } from 'path';
import fs from 'fs-extra';
const { writeFile } = fs;
import { parse } from 'smol-toml';
import { substituteVariables } from '../../utils/template.js';
import type { 
  ContentStrategy, 
  FileStrategy, 
  ContentStrategyOptions, 
  FileStrategyOptions 
} from '../types.js';
import { normalizeWorkflowContent, normalizeWorkflowFilename } from '../utils.js';

export class DefaultContentStrategy implements ContentStrategy {
  process(templateContent: string, options: ContentStrategyOptions): string | null {
    const { installPath, agentType } = options;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = parse(templateContent) as any;

    if (!parsed.prompt) {
      return null;
    }

    let prompt = parsed.prompt;
    prompt = prompt.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
    const finalContent = substituteVariables(prompt, { agent_type: agentType });

    const content = parsed.description
      ? `---\ndescription: ${parsed.description}\n---\n${finalContent}`
      : finalContent;

    return normalizeWorkflowContent(content);
  }
}

export class DefaultFileStrategy implements FileStrategy {
  async write(options: FileStrategyOptions): Promise<void> {
    const { targetDir, agentDir, commandsDir, commandName, extension, content } = options;
    const rawFileName = `conductor:${commandName}${extension}`;
    const fileName = normalizeWorkflowFilename(rawFileName);
    await writeFile(join(targetDir, agentDir, commandsDir, fileName), content);
  }
}

export const defaultContentStrategy = new DefaultContentStrategy();
export const defaultFileStrategy = new DefaultFileStrategy();
