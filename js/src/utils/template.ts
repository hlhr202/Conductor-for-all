import { readFile, stat } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export function substituteVariables(template: string, variables: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(variables, key)) {
      return variables[key];
    }
    return match;
  });
}

export async function getTemplateRoot(): Promise<string> {
  const candidates = [
    join(__dirname, 'templates'), 
    join(__dirname, '../templates'),
    join(__dirname, '../../../gemini-conductor-codebase')
  ];

  for (const path of candidates) {
    try {
      if ((await stat(path)).isDirectory()) {
         return path;
      }
    } catch {
      continue;
    }
  }
  throw new Error(`Template directory not found. Searched in: ${candidates.join(', ')}`);
}

export async function loadTemplate(templatePath: string): Promise<string> {
  const rootDir = await getTemplateRoot();
  const fullPath = join(rootDir, templatePath);
  return readFile(fullPath, 'utf-8');
}
