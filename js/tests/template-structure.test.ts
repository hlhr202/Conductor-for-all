import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'fs';
import { join } from 'path';

describe('Template Structure', () => {
  const templatesDir = join(process.cwd(), 'templates');

  describe('Agent Directories', () => {
    it('should have opencode directory', () => {
      const opencodeDir = join(templatesDir, 'opencode');
      expect(existsSync(opencodeDir)).toBe(true);
      expect(statSync(opencodeDir).isDirectory()).toBe(true);
    });

    it('should have claude-code directory', () => {
      const claudeDir = join(templatesDir, 'claude-code');
      expect(existsSync(claudeDir)).toBe(true);
      expect(statSync(claudeDir).isDirectory()).toBe(true);
    });
  });

  describe('Opencode Structure', () => {
    it('should have commands directory', () => {
      const commandsDir = join(templatesDir, 'opencode/commands');
      expect(existsSync(commandsDir)).toBe(true);
      expect(statSync(commandsDir).isDirectory()).toBe(true);
    });

    it('should have conductor directory', () => {
      const conductorDir = join(templatesDir, 'opencode/conductor');
      expect(existsSync(conductorDir)).toBe(true);
      expect(statSync(conductorDir).isDirectory()).toBe(true);
    });
  });

  describe('Claude Code Structure', () => {
    it('should have commands directory', () => {
        const commandsDir = join(templatesDir, 'claude-code/commands');
        expect(existsSync(commandsDir)).toBe(true);
        expect(statSync(commandsDir).isDirectory()).toBe(true);
      });
  
      it('should have conductor directory', () => {
        const conductorDir = join(templatesDir, 'claude-code/conductor');
        expect(existsSync(conductorDir)).toBe(true);
        expect(statSync(conductorDir).isDirectory()).toBe(true);
      });
  });
});
