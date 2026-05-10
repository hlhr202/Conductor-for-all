# Conductor for All

[![npm version](https://badge.fury.io/js/conductor-4-all.svg)](https://badge.fury.io/js/conductor-4-all)

<img src="./conductor_banner.png" height="400" alt="Conductor for All Banner" />

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md) | [한국어](./README_ko.md)

> [!IMPORTANT]
> **Recommended migration:** The maintainer recommends migrating new and existing skill-based workflows to [hlhr202/swe-skills](https://github.com/hlhr202/swe-skills).
>
> This recommendation is intentional: Google's upstream Conductor ecosystem has introduced a Google-owned service-related skill catalog, and this project does not intend to reference or depend on that catalog. `swe-skills` fully inherits the Conductor workflow model while adding an architecture discussion process.

**Conductor for All** is a standalone command-line tool designed to bring the [Conductor](https://github.com/gemini-cli-extensions/conductor) spec-driven development methodology to *any* coding environment.

Originally tied to the Gemini CLI extension, this project aims to decouple the methodology, allowing developers to install and initialize Conductor workflows in their projects so they can be leveraged by **any** AI Coding Agent (e.g., Claude Code, Cursor, VS Code Copilot, Codex) or IDE.

## 🎯 Goals

-   **Universal Compatibility:** Enable the Conductor methodology outside of the Gemini CLI ecosystem.
-   **Agent-Agnostic Setup:** Provide a mechanism to "install" Conductor commands and templates into a project, effectively "enabling" it for consumption by multiple different coding agents.
-   **Standardization:** Create a unified interface for project orchestration that bridges the gap between human intent and AI execution.

## 🔧 Skills Install Mode (Recommended)

Conductor supports two primary installation formats: "Slash Custom Prompts (Commands)" and "Skills". We recommend the **Skills** installation mode as the preferred option for most projects.

- **What "Skills" does:** Installs Conductor as agentskills.io–style skill files (or agent-specific skill directories) so your Conductor commands and workflows are discoverable and consumable by a wide range of AI agents and tooling.
- **Why prefer Skills:** Skills are more portable across agents and platforms, easier to version and distribute, and better aligned with agent ecosystems that support skill/skillpack discovery. They avoid relying on agent-specific slash-command syntax and generally offer better long-term compatibility.
- **When to still use Slash Commands:** Use the slash command / prompt-file form when your environment or agent specifically requires prompt files (for example, some local prompt-driven integrations or editor-specific prompt formats).
- **Example install targets:**
	- `.agents/skills/` — general skills directory (recommended default)
	- `.claude/skills/` — Claude Code specific

When running the installer, choose **Skills** to get the recommended, cross-agent installation by default.

## 🚀 Usage

### 1. Setup Conductor in Your Project

To initialize Conductor in your project, simply run the following command in your project root:

```bash
npx conductor-4-all install
```

### 2. Alternative: Build from Source

If you prefer to build from source:

```bash
pnpm install
pnpm build
node dist/index.js install
```

You will be prompted to select your AI Coding Agent:
-   **Opencode**
-   **Claude Code**
-   **Antigravity**
-   **Cursor**
-   **VS Code Copilot**
-   **Codex**
-   **Windsurf**
-   **Cline**
-   **Gemini CLI**

This will verify the environment and install the necessary Conductor files:
-   **Commands:** Agent-specific prompt or command files (e.g., `.opencode/commands/conductor:setup.md` or `.gemini/commands/conductor:setup.toml`) that your agent can execute.
-   **Templates:** Workflow guides and style guides (e.g., `.opencode/conductor/templates/`).

### 3. Using Conductor with Your Agent

Once installed, you can instruct your AI Agent to perform Conductor tasks using the installed commands or the provided skill files. For example:

- `@agent /conductor-setup` — Initialize the project structure. (skill: `.agents/skills/conductor-setup/SKILL.md`)
- `@agent /conductor-newTrack` — Start a new feature or bug fix track. (skill: `.agents/skills/conductor-newTrack/SKILL.md`)
- `@agent /conductor-implement` — Implement the selected track. (skill: `.agents/skills/conductor-implement/SKILL.md`)
- `@agent /conductor-status` — Check the status of current tracks. (skill: `.agents/skills/conductor-status/SKILL.md`)
- `@agent /conductor-review` — Run the review protocol for a track. (skill: `.agents/skills/conductor-review/SKILL.md`)
- `@agent /conductor-revert` — Revert changes related to a track. (skill: `.agents/skills/conductor-revert/SKILL.md`)

*Note: many agents can run the skill by opening the skill file (for example, open `.agents/skills/conductor-implement/SKILL.md`), or by selecting/running the skill name in the agent UI. Skills also commonly include a recommended slash invocation so you can keep using the short command form.*



## 🙏 Acknowledgements

This project is inspired by and based on the [Conductor](https://github.com/gemini-cli-extensions/conductor) methodology originally developed for the **Gemini CLI**. We aim to extend its benefits to the broader developer ecosystem.
