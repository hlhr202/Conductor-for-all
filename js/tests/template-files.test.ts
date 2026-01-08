import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Template Files', () => {
  const templatesDir = join(process.cwd(), 'templates');

  describe('Opencode Commands', () => {
    const commandsDir = join(templatesDir, 'opencode/commands');

    it('should have conductor:setup.md', () => {
      const filePath = join(commandsDir, 'conductor:setup.md');
      expect(existsSync(filePath)).toBe(true);
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('{agent_type}');
    });

    it('should have conductor:newTrack.md', () => {
      const filePath = join(commandsDir, 'conductor:newTrack.md');
      expect(existsSync(filePath)).toBe(true);
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('{agent_type}');
    });

    it('should have conductor:implement.md', () => {
      const filePath = join(commandsDir, 'conductor:implement.md');
      expect(existsSync(filePath)).toBe(true);
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('{agent_type}');
    });

    it('should have conductor:status.md', () => {
      const filePath = join(commandsDir, 'conductor:status.md');
      expect(existsSync(filePath)).toBe(true);
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('{agent_type}');
    });
  });

  describe('Global Conductor Files', () => {
      // These are usually in templates/conductor/ or similar?
      // Plan says: "Create templates for conductor/ directory files (tech-stack.md, workflow.md, etc.)"
      // But where? "js/templates/opencode/conductor"?
      // The previous task created "opencode/conductor".
      // So I check there.
      const conductorDir = join(templatesDir, 'opencode/conductor');

      it('should have tech-stack.md', () => {
          expect(existsSync(join(conductorDir, 'tech-stack.md'))).toBe(true);
      });

      it('should have workflow.md', () => {
          expect(existsSync(join(conductorDir, 'workflow.md'))).toBe(true);
      });
      
      it('should have product.md', () => {
          expect(existsSync(join(conductorDir, 'product.md'))).toBe(true);
      });
  });
});
