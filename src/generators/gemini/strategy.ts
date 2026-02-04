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

export class GeminiContentStrategy implements ContentStrategy {
  process(templateContent: string, options: ContentStrategyOptions): string | null {
    const { installPath, agentType, commandsDir } = options;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = parse(templateContent) as any;

    if (!parsed.prompt) {
      return null;
    }

    // Gemini preserves the TOML structure
    const content = templateContent.replace(/__\$\$CODE_AGENT_INSTALL_PATH\$\$__/g, installPath);
    const substituted = substituteVariables(content, { agent_type: agentType });
    return normalizeWorkflowContent(substituted, commandsDir);
  }
}

export class GeminiFileStrategy implements FileStrategy {
  async write(options: FileStrategyOptions): Promise<void> {
    const { targetDir, agentDir, commandsDir, commandName, extension, content } = options;
    // For Gemini, we remove the 'conductor:' prefix as per new spec
    const rawFileName = `${commandName}${extension}`;
    const fileName = normalizeWorkflowFilename(rawFileName, commandsDir);
    await writeFile(join(targetDir, agentDir, commandsDir, fileName), content);
  }
}

export const geminiContentStrategy = new GeminiContentStrategy();
export const geminiFileStrategy = new GeminiFileStrategy();
