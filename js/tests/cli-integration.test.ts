import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join } from 'path';

describe('CLI Integration', () => {
  const cliPath = join(process.cwd(), 'dist', 'index.js');

  it('should display version', () => {
    const output = execSync(`node ${cliPath} --version`).toString();
    expect(output).toContain('1.0.0');
  });

  it('should display help', () => {
    const output = execSync(`node ${cliPath} --help`).toString();
    expect(output).toContain('conductor <cmd> [args]');
    expect(output).toContain('install [path]');
  });
});
