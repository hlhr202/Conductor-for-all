import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import * as fs from 'fs';
import { join } from 'path';

describe('CLI Integration', () => {
  const cliPath = join(process.cwd(), 'dist', 'index.js');

  it('should display version', () => {
    const pkg = JSON.parse(fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
    const output = execSync(`node ${cliPath} --version`).toString();
    expect(output).toContain(pkg.version);
  });

  it('should display help', () => {
    const output = execSync(`node ${cliPath} --help`).toString();
    expect(output).toContain('conductor <cmd> [args]');
    expect(output).toContain('install [path]');
  });
});
