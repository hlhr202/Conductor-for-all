export function normalizeWorkflowFilename(fileName: string, commandsDir: string): string {
  if (process.platform !== 'win32') {
    return fileName;
  }

  if (!commandsDir.includes('workflows')) {
    return fileName;
  }

  return fileName.replace(/:/g, '_');
}

export function normalizeWorkflowContent(content: string, commandsDir: string): string {
  if (process.platform !== 'win32') {
    return content;
  }

  if (!commandsDir.includes('workflows')) {
    return content;
  }

  return content.replace(/\bconductor:([a-zA-Z0-9_-]+)/g, 'conductor_$1');
}
