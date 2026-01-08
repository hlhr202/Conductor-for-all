import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'fs';
import { join } from 'path';

describe('Project Structure Initialization', () => {
  const testDir = process.cwd();

  describe('js/ directory', () => {
    it('should exist', () => {
      expect(existsSync(testDir)).toBe(true);
    });

    it('should be a directory', () => {
      expect(existsSync(testDir)).toBe(true);
      const stats = statSync(testDir);
      expect(stats.isDirectory()).toBe(true);
    });
  });

  describe('package.json', () => {
    it('should exist', () => {
      const packageJsonPath = join(testDir, 'package.json');
      expect(existsSync(packageJsonPath)).toBe(true);
    });
  });

  describe('src/ directory', () => {
    it('should exist', () => {
      const srcDir = join(testDir, 'src');
      expect(existsSync(srcDir)).toBe(true);
      const stats = statSync(srcDir);
      expect(stats.isDirectory()).toBe(true);
    });
  });

  describe('templates/ directory', () => {
    it('should NOT exist in source (uses gemini-conductor-codebase)', () => {
      const templatesDir = join(testDir, 'templates');
      expect(existsSync(templatesDir)).toBe(false);
    });
  });

  describe('dist/ directory', () => {
    it('should exist', () => {
      const distDir = join(testDir, 'dist');
      expect(existsSync(distDir)).toBe(true);
      const stats = statSync(distDir);
      expect(stats.isDirectory()).toBe(true);
    });
  });
});
