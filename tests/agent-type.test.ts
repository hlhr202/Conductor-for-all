
import { describe, it, expectTypeOf } from 'vitest';
import { AgentType } from '../src/types.js';

describe('AgentType Definition', () => {
  it('should include antigravity as a valid agent type', () => {
    // This test expects 'antigravity' to be assignable to AgentType
    const agent: AgentType = 'antigravity';
    expectTypeOf(agent).toMatchTypeOf<AgentType>();
  });
});
