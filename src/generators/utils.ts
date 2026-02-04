export function normalizeWorkflowFilename(fileName: string, commandsDir: string): string {
  if (process.platform !== 'win32') {
    return fileName;
  }

  if (!commandsDir.includes('workflows')) {
    return fileName;
  }

  return fileName.replace(/:/g, '_');
}
