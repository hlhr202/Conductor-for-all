import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

describe('Tsup Build Configuration', () => {
  const tsupConfigPath = join(process.cwd(), 'tsup.config.ts');

  describe('tsup.config.ts', () => {
    it('should exist', () => {
      expect(existsSync(tsupConfigPath)).toBe(true);
    });

    it('should configure output to js/dist/', () => {
      const tsupConfig = readFileSync(tsupConfigPath, 'utf-8');
      expect(tsupConfig).toContain('dist');
    });

    it('should bundle templates', () => {
      const tsupConfig = readFileSync(tsupConfigPath, 'utf-8');
      expect(tsupConfig).toMatch(/entry|bundle|include/i);
    });
  });

  describe('Build output', () => {
    it('should build to js/dist/', () => {
      expect(() => {
        execSync('npx tsup', { stdio: 'inherit' });
      }).not.toThrow();
    });

    it('should create output files', () => {
      const distDir = join(process.cwd(), 'dist');
      expect(existsSync(distDir)).toBe(true);
    });
  });
});
