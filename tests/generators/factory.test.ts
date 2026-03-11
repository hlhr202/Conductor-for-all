
import { describe, it, expect } from 'vitest';
import { 
    getGenerator,
    OpenCodeGenerator,
    ClaudeCodeGenerator,
    CursorGenerator,
    ClineGenerator
} from '../../src/generators/index.js';

describe('getGenerator', () => {
    it('should return OpenCodeGenerator for "opencode"', () => {
        expect(getGenerator('opencode')).toBeInstanceOf(OpenCodeGenerator);
    });

    it('should return ClaudeCodeGenerator for "claude-code"', () => {
        expect(getGenerator('claude-code')).toBeInstanceOf(ClaudeCodeGenerator);
    });

    it('should return CursorGenerator for "cursor"', () => {
        expect(getGenerator('cursor')).toBeInstanceOf(CursorGenerator);
    });

    it('should return ClineGenerator for "cline"', () => {
        expect(getGenerator('cline')).toBeInstanceOf(ClineGenerator);
    });
});
