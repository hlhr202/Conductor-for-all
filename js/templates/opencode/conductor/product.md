# Initial Concept
To create a standalone command-line tool using Rust and `clap` that brings the Conductor methodology to *any* coding environment. Currently, Conductor is tied to the Gemini CLI extension. This project, `conductor-4-all`, aims to decouple it, allowing developers to install and initialize Conductor workflows in their projects so they can be leveraged by any AI Coding Agent (e.g., Claude Code, Cline, Cursor, Windsurf) or IDE.

## Target Audience
- **Software Developers:** Who want to bring structured, agent-friendly workflows to their projects regardless of the tools they use.
- **AI Agents:** That need a standardized way to understand and execute tasks within a codebase.
- **Engineering Teams:** Who need consistent project setup and task management protocols across different development environments.

## Core Goals
- **Universal Compatibility:** Enable the Conductor methodology outside of the Gemini CLI ecosystem.
- **Agent-Agnostic Setup:** Provide a mechanism to "install" Conductor commands and templates into a project, effectively "enabling" it for consumption by multiple different coding agents.
- **Standardization:** Create a unified interface for project orchestration that bridge the gap between human intent and AI execution.

## Key Features
- **Project Initialization & Installation:** A robust CLI to scaffold the necessary Conductor directories, templates, and configuration files into any project.
- **Universal Command Interface:** A set of standardized commands (implemented via `clap`) to manage the lifecycle of tasks and tracks, designed to be easily invoked by both humans and agents.
- **Cross-Platform Support:** High-performance, native binary execution provided by Rust.
