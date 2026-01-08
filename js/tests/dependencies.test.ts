import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Dependencies', () => {
  const packageJsonPath = join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  describe('Core dependencies', () => {
    it('should have yargs installed', () => {
      expect(packageJson.devDependencies?.yargs).toBeDefined();
      expect(packageJson.devDependencies?.['@types/yargs']).toBeDefined();
    });

    it('should have inquirer installed', () => {
      expect(packageJson.devDependencies?.inquirer).toBeDefined();
    });

    it('should have tsup installed', () => {
      expect(packageJson.devDependencies?.tsup).toBeDefined();
    });

    it('should have vitest installed', () => {
      expect(packageJson.devDependencies?.vitest).toBeDefined();
      expect(packageJson.devDependencies?.['@vitest/coverage-v8']).toBeDefined();
    });

    it('should have TypeScript installed', () => {
      expect(packageJson.devDependencies?.typescript).toBeDefined();
    });

    it('should have @types/node installed', () => {
      expect(packageJson.devDependencies?.['@types/node']).toBeDefined();
    });

    it('should have fs-extra installed', () => {
      expect(packageJson.devDependencies?.['fs-extra']).toBeDefined();
      expect(packageJson.devDependencies?.['@types/fs-extra']).toBeDefined();
    });
  });
});
