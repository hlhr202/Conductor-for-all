import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

describe('TypeScript Configuration', () => {
  const tsconfigPath = join(process.cwd(), 'tsconfig.json');

  describe('tsconfig.json', () => {
    it('should exist', () => {
      expect(existsSync(tsconfigPath)).toBe(true);
    });

    it('should have strict mode enabled', () => {
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.compilerOptions?.strict).toBe(true);
    });

    it('should target Node.js', () => {
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.compilerOptions?.module).toBeDefined();
      expect(tsconfig.compilerOptions?.target).toBeDefined();
    });

    it('should enable strict null checks', () => {
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.compilerOptions?.strictNullChecks).toBe(true);
    });
  });

  describe('TypeScript compilation', () => {
    it('should compile without errors', () => {
      expect(() => {
        execSync('npx tsc --noEmit', { stdio: 'inherit' });
      }).not.toThrow();
    });

    it('should perform type checking', () => {
      expect(() => {
        execSync('npx tsc --noEmit', { stdio: 'inherit' });
      }).not.toThrow();
    });
  });
});
