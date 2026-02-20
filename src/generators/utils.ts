export function normalizeWorkflowFilename(fileName: string): string {
  if (process.platform !== 'win32') {
    return fileName;
  }

  return fileName.replace(/:/g, '_');
}

export function normalizeWorkflowContent(content: string): string {
  if (process.platform !== 'win32') {
    return content;
  }

  return content.replace(/\bconductor:([a-zA-Z0-9_-]+)/g, 'conductor_$1');
}
