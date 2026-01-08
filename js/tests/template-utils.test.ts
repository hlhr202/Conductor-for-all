import { describe, it, expect } from 'vitest';
import { substituteVariables, loadTemplate } from '../src/utils/template';

describe('Template Substitution', () => {
  it('should replace {agent_type}', () => {
    const template = 'Hello {agent_type}';
    const result = substituteVariables(template, { agent_type: 'World' });
    expect(result).toBe('Hello World');
  });

  it('should replace multiple variables', () => {
    const template = '{greeting} {agent_type}';
    const result = substituteVariables(template, { greeting: 'Hi', agent_type: 'User' });
    expect(result).toBe('Hi User');
  });

  it('should handle missing variables by throwing error', () => {
    const template = 'Hello {missing}';
    expect(() => substituteVariables(template, {})).toThrow();
  });

  it('should ignore unused variables in context', () => {
      const template = 'Hello {name}';
      const result = substituteVariables(template, { name: 'World', unused: 'foo' });
      expect(result).toBe('Hello World');
  });

  describe('Template Loader', () => {
    it('should load a template file', async () => {
      const content = await loadTemplate('opencode/commands/conductor:setup.md');
      expect(content).toContain('Conductor Setup');
    });

    it('should throw if file missing', async () => {
      await expect(loadTemplate('missing.md')).rejects.toThrow();
    });
  });
});
