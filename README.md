# Conductor for All

**Conductor for All** is a standalone command-line tool designed to bring the [Conductor](https://github.com/google/labs-prototypes/tree/main/gemini-cli) spec-driven development methodology to *any* coding environment.

Originally tied to the Gemini CLI extension, this project aims to decouple the methodology, allowing developers to install and initialize Conductor workflows in their projects so they can be leveraged by **any** AI Coding Agent (e.g., Claude Code, Cline, Cursor, Windsurf) or IDE.

## 🎯 Goals

-   **Universal Compatibility:** Enable the Conductor methodology outside of the Gemini CLI ecosystem.
-   **Agent-Agnostic Setup:** Provide a mechanism to "install" Conductor commands and templates into a project, effectively "enabling" it for consumption by multiple different coding agents.
-   **Standardization:** Create a unified interface for project orchestration that bridges the gap between human intent and AI execution.

## 🚀 Usage

### 1. Installation

#### Option A: Node.js (Recommended) (New!)

You can install the tool globally via npm:

```bash
npm install -g conductor-4-all
```

#### Option B: From Crates.io (Rust)

You can install the Rust version directly from crates.io.

```bash
cargo install conductor-4-all
```

#### Option C: From Source

**Node.js:**
```bash
cd js
npm install
npm run build
node dist/index.js install <target>
```

**Rust:**
```bash
cargo build --release
./target/release/conductor install
```

### 2. Setup Conductor in Your Project

Run the `install` command in the root of your project:

```bash
# If installed via cargo:
conductor install

# If built from source:
./target/release/conductor install
```

You will be prompted to select your AI Coding Agent:
-   **Opencode**
-   **Claude Code**

This will verify the environment and install the necessary Conductor files:
-   **Commands:** Agent-specific prompt files (e.g., `.opencode/commands/conductor:setup.md`) that your agent can execute.
-   **Templates:** Workflow guides and style guides (e.g., `.opencode/conductor/templates/`).

### 3. Using Conductor with Your Agent

Once installed, you can instruct your AI Agent to perform Conductor tasks using the installed commands. For example:

-   `@agent /conductor:setup` - Initialize the project structure.
-   `@agent /conductor:newTrack` - Start a new feature or bug fix track.
-   `@agent /conductor:implement` - Implement the selected track.
-   `@agent /conductor:status` - Check the status of current tracks.

*Note: The exact invocation syntax depends on your specific agent's slash command or file context capabilities.*

## 🛠️ Contribution Guide

We follow a strict spec-driven development workflow ourselves!

-   **Workflow:** Please read [`conductor/workflow.md`](./conductor/workflow.md) for our detailed development protocols (Tasks, TDD, Commits).
-   **Tech Stack:** Check [`conductor/tech-stack.md`](./conductor/tech-stack.md) for approved technologies (Rust, Node.js, etc.).
-   **Product Guidelines:** See [`conductor/product-guidelines.md`](./conductor/product-guidelines.md) for design philosophy.

To start contributing:
1.  Read the docs above.
2.  Pick a task from `conductor/tracks.md` (or propose one).
3.  Follow the **Conductor Workflow** to implement it.

## 🙏 Acknowledgements

This project is inspired by and based on the **Conductor** methodology originally developed for the **Gemini CLI**. We aim to extend its benefits to the broader developer ecosystem.
