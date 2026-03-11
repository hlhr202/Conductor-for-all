export interface SkillsGenerator {
  generate(targetDir: string): Promise<void>;
}
