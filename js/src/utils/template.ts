import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export function substituteVariables(template: string, variables: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(variables, key)) {
      return variables[key];
    }
    throw new Error(`Missing variable for substitution: ${key}`);
  });
}

export async function loadTemplate(templatePath: string): Promise<string> {
  const rootDir = resolve(__dirname, '../../');
  const fullPath = join(rootDir, 'templates', templatePath);
  return readFile(fullPath, 'utf-8');
}
