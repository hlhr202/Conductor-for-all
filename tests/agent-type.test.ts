
import { describe, it, expectTypeOf } from 'vitest';
import { AgentType, PromptAgentType } from '../src/types.js';

describe('AgentType Definition', () => {
  it('should include antigravity as a valid agent type for skills support', () => {
    const agent: AgentType = 'antigravity';
    expectTypeOf(agent).toMatchTypeOf<AgentType>();
  });

  it('should keep prompt agent type aligned with command generators', () => {
    const agent: PromptAgentType = 'cursor';
    expectTypeOf(agent).toMatchTypeOf<PromptAgentType>();
    expectTypeOf<PromptAgentType>().not.toMatchTypeOf<'antigravity'>();
  });

  it('should include vscode-copilot as a valid agent type', () => {
    const agent: AgentType = 'vscode-copilot';
    expectTypeOf(agent).toMatchTypeOf<AgentType>();
  });

  it('should include windsurf as a valid agent type', () => {
    const agent: AgentType = 'windsurf';
    expectTypeOf(agent).toMatchTypeOf<AgentType>();
  });

  it('should include cline as a valid agent type', () => {
    const agent: AgentType = 'cline';
    expectTypeOf(agent).toMatchTypeOf<AgentType>();
  });
});
