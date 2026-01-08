import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Vitest Configuration', () => {
  const vitestConfigPath = join(process.cwd(), 'js', 'vitest.config.ts');

  describe('vitest.config.ts', () => {
    it('should exist', () => {
      expect(existsSync(vitestConfigPath)).toBe(true);
    });

    it('should disable watch mode', () => {
      const vitestConfig = readFileSync(vitestConfigPath, 'utf-8');
      expect(vitestConfig).toMatch(/watch:\s*false/);
    });

    it('should configure test coverage', () => {
      const vitestConfig = readFileSync(vitestConfigPath, 'utf-8');
      expect(vitestConfig).toMatch(/coverage|thresholds/i);
    });

    it('should configure coverage threshold >80%', () => {
      const vitestConfig = readFileSync(vitestConfigPath, 'utf-8');
      expect(vitestConfig).toMatch(/80/);
    });

    it('should configure Node.js environment', () => {
      const vitestConfig = readFileSync(vitestConfigPath, 'utf-8');
      expect(vitestConfig).toMatch(/environment.*node/i);
    });
  });
});
