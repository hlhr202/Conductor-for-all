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
  const templateRoot = join(__dirname, 'templates');

  try {
    if ((await stat(templateRoot)).isDirectory()) {
      return templateRoot;
    }
  } catch {
    // fall through to error below
  }

  throw new Error(`Template directory not found. Searched in: ${templateRoot}`);
}

export async function loadTemplate(templatePath: string): Promise<string> {
  const rootDir = await getTemplateRoot();
  const fullPath = join(rootDir, templatePath);
  return readFile(fullPath, 'utf-8');
}
