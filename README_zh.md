# Conductor for All

[![npm version](https://badge.fury.io/js/conductor-4-all.svg)](https://badge.fury.io/js/conductor-4-all)

<img src="./conductor_banner.png" height="400" alt="Conductor for All Banner" />

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md) | [한국어](./README_ko.md)

**Conductor for All** 是一个独立的命令行工具，旨在将 [Conductor](https://github.com/gemini-cli-extensions/conductor) 规范驱动的开发方法论带入 *任何* 编码环境。

该项目最初与 Gemini CLI 扩展绑定，旨在解耦该方法论，允许开发人员在他们的项目中安装和初始化 Conductor 工作流，以便可以被 **任何** AI 编码代理（例如 Claude Code, Cursor, VS Code Copilot, Codex）或 IDE 利用。

## 🎯 目标

-   **通用兼容性：** 在 Gemini CLI 生态系统之外启用 Conductor 方法论。
-   **代理无关的设置：** 提供一种机制来将 Conductor 命令和模板“安装”到项目中，有效地“启用”它以供多种不同的编码代理使用。
-   **标准化：** 创建一个统一的项目编排接口，弥合人类意图与 AI 执行之间的差距。

## 🔧 Skills 安装模式（推荐）

Conductor 支持两种主要的安装格式："Slash Custom Prompts (Commands)" 和 "Skills"。我们推荐在大多数项目中优先使用 **Skills** 安装模式。

- **Skills 做什么：** 将 Conductor 作为 agentskills.io 风格的 skill 文件（或代理特定的 skill 目录）安装，使 Conductor 命令和工作流可被更多 AI 代理与工具发现和使用。
- **为何优先使用 Skills：** Skills 在不同代理与平台之间更具可移植性，便于版本控制与分发，并且与支持 skill/skillpack 发现的代理生态更契合，不依赖于代理特定的斜杠命令语法。
- **示例安装目标：**
	- `.agents/skills/` — 通用 skills 目录（推荐默认）
	- `.claude/skills/` — Claude Code 专用
	- `.gemini/skills/` — Gemini CLI / 协议专用

在运行安装程序时，选择 **Skills** 可获得推荐的跨代理安装方式。

## 🚀 使用方法

### 1. 在你的项目中设置 Conductor

要在你的项目中初始化 Conductor，只需在项目根目录下运行以下命令：

```bash
npx conductor-4-all install
```

### 2. 或者：从源码构建

如果你更喜欢从源码构建：

```bash
pnpm install
pnpm build
node dist/index.js install
```

你将被提示选择你的 AI 编码代理：
-   **Opencode**
-   **Claude Code**
-   **Antigravity**
-   **Cursor**
-   **VS Code Copilot**
-   **Codex**
-   **Windsurf**
-   **Cline**
-   **Gemini CLI**

这将验证环境并安装必要的 Conductor 文件：
-   **Commands:** 代理特定的提示或命令文件（例如 `.opencode/commands/conductor:setup.md` 或 `.gemini/commands/conductor:setup.toml`），你的代理可以执行这些文件。
-   **Templates:** 工作流指南和风格指南（例如 `.opencode/conductor/templates/`）。

### 3. 与你的代理一起使用 Conductor

安装完成后，你可以指示你的 AI 代理使用安装的命令或提供的 skill 文件执行 Conductor 任务。例如：

- `@agent /conductor-setup` — 初始化项目结构。 (skill: `.agents/skills/conductor-setup/SKILL.md`)
- `@agent /conductor-newTrack` — 开始一个新的功能或错误修复轨道。 (skill: `.agents/skills/conductor-newTrack/SKILL.md`)
- `@agent /conductor-implement` — 实现选定的轨道。 (skill: `.agents/skills/conductor-implement/SKILL.md`)
- `@agent /conductor-status` — 检查当前轨道的状态。 (skill: `.agents/skills/conductor-status/SKILL.md`)
- `@agent /conductor-review` — 运行轨道评审流程。 (skill: `.agents/skills/conductor-review/SKILL.md`)
- `@agent /conductor-revert` — 回滚与轨道相关的更改。 (skill: `.agents/skills/conductor-revert/SKILL.md`)

*注意：许多代理可以通过打开 skill 文件（例如打开 `.agents/skills/conductor-implement/SKILL.md`）来运行该 skill，或在代理 UI 中选择/运行 skill 名称。skill 通常也包含推荐的斜杠调用，以便仍可使用简短命令形式。*



## 🙏 致谢

本项目受到最初为 **Gemini CLI** 开发的 [Conductor](https://github.com/gemini-cli-extensions/conductor) 方法论的启发并基于此构建。我们旨在将其优势扩展到更广泛的开发者生态系统。
