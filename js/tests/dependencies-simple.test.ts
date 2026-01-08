import { describe, it, expect } from 'vitest';

describe('Dependencies - Simplified', () => {
  const packageJsonPath = join(process.cwd(), 'js', 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  describe('Core dependencies', () => {
    it('should have yargs installed', () => {
      expect(packageJson.devDependencies?.yargs).toBeDefined();
    });

    it('should have inquirer installed', () => {
      expect(packageJson.devDependencies?.inquirer).toBeDefined();
    });

    it('should have tsup installed', () => {
      expect(packageJson.devDependencies?.tsup).toBeDefined();
    });

    it('should have vitest installed', () => {
      expect(packageJson.devDependencies?.vitest).toBeDefined();
    });

    it('should have TypeScript installed', () => {
      expect(packageJson.devDependencies?.typescript).toBeDefined();
    });

    it('should have @types/node installed', () => {
      expect(packageJson.devDependencies?.['@types/node']).toBeDefined();
    });

    it('should have fs-extra installed', () => {
      expect(packageJson.devDependencies?.['fs-extra']).toBeDefined();
    });

    it('should have @types/fs-extra installed', () => {
      expect(packageJson.devDependencies?.['@types/fs-extra']).toBeDefined();
    });
  });
});
