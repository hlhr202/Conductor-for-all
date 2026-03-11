import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { substituteVariables, loadTemplate, getTemplateRoot } from '../src/utils/template';

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

  it('should ignore missing variables', () => {
    const template = 'Hello {missing}';
    const result = substituteVariables(template, {});
    expect(result).toBe('Hello {missing}');
  });

  it('should ignore unused variables in context', () => {
      const template = 'Hello {name}';
      const result = substituteVariables(template, { name: 'World', unused: 'foo' });
      expect(result).toBe('Hello World');
  });

  describe('Template Loader', () => {
    it('should only search the runtime dist templates directory', async () => {
      await expect(getTemplateRoot()).rejects.toThrow(
        `Template directory not found. Searched in: ${join(process.cwd(), 'src', 'utils', 'templates')}`
      );
    });

    it('should throw if templates are unavailable in source runtime', async () => {
      await expect(loadTemplate('commands/setup.toml')).rejects.toThrow('Template directory not found');
    });

    it('should throw if file missing', async () => {
      await expect(loadTemplate('missing.md')).rejects.toThrow();
    });
  });
});
