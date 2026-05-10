# Conductor for All

[![npm version](https://badge.fury.io/js/conductor-4-all.svg)](https://badge.fury.io/js/conductor-4-all)

<img src="./conductor_banner.png" height="400" alt="Conductor for All Banner" />

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md) | [한국어](./README_ko.md)

> [!IMPORTANT]
> **마이그레이션 권장:** 메인터이너는 신규 및 기존 skill 기반 워크플로를 [hlhr202/swe-skills](https://github.com/hlhr202/swe-skills)로 마이그레이션할 것을 권장합니다.
>
> 이 권장에는 명확한 이유가 있습니다. Google의 upstream Conductor 생태계에 Google 자체 service 관련 skill catalog가 도입되었지만, 본 프로젝트는 해당 catalog를 참조하거나 의존할 의도가 없습니다. `swe-skills`는 Conductor의 워크플로 모델을 완전히 계승하면서 아키텍처 논의 프로세스를 추가합니다.

**Conductor for All**은 [Conductor](https://github.com/gemini-cli-extensions/conductor) 사양 기반 개발 방법론을 *모든* 코딩 환경에 도입하기 위해 설계된 독립형 명령줄 도구입니다.

원래 Gemini CLI 확장에 종속되어 있던 이 프로젝트는 방법론을 분리하여 개발자가 자신의 프로젝트에서 Conductor 워크플로우를 설치하고 초기화할 수 있도록 함으로써 **모든** AI 코딩 에이전트(예: Claude Code, Cursor, VS Code Copilot, Codex) 또는 IDE에서 활용할 수 있도록 하는 것을 목표로 합니다.

## 🎯 목표

-   **범용 호환성:** Gemini CLI 생태계 외부에서 Conductor 방법론을 활성화합니다.
-   **에이전트 불가지론적 설정:** 프로젝트에 Conductor 명령과 템플릿을 "설치"하는 메커니즘을 제공하여 여러 다른 코딩 에이전트가 사용할 수 있도록 "활성화"합니다.
-   **표준화:** 인간의 의도와 AI 실행 사이의 격차를 좁히는 프로젝트 오케스트레이션을 위한 통합 인터페이스를 만듭니다.

## 🔧 Skills 설치 모드(권장)

Conductor는 기본적으로 두 가지 설치 형식을 지원합니다: "Slash Custom Prompts (Commands)"와 "Skills". 대부분의 프로젝트에서는 **Skills** 설치 모드를 권장합니다.

- **Skills가 하는 일:** Conductor를 agentskills.io 스타일의 스킬 파일(또는 에이전트별 스킬 디렉터리)로 설치하여 Conductor 명령과 워크플로를 다양한 AI 에이전트와 도구에서 발견하고 사용할 수 있게 합니다.
- **Skills를 권장하는 이유:** 에이전트와 플랫폼 간 이식성이 높고 버전 관리 및 배포가 쉬우며, 스킬/스킬팩 검색을 지원하는 에코시스템과 잘 맞아 에이전트 특정의 슬래시 명령 구문에 의존하지 않습니다.
- **예시 설치 대상:**
	- `.agents/skills/` — 일반 스킬 디렉터리(권장 기본)
	- `.claude/skills/` — Claude Code 전용
	- `.gemini/skills/` — Gemini CLI / 프로토콜 전용

설치 프로그램을 실행할 때 **Skills**를 선택하면 권장되는 크로스-에이전트 설치를 받을 수 있습니다.

## 🚀 사용법

### 1. 프로젝트에서 Conductor 설정

프로젝트에서 Conductor를 초기화하려면 프로젝트 루트에서 다음 명령을 실행하기만 하면 됩니다:

```bash
npx conductor-4-all install
```

### 2. 대안: 소스에서 빌드

소스에서 빌드하려는 경우:

```bash
pnpm install
pnpm build
node dist/index.js install
```

AI 코딩 에이전트를 선택하라는 메시지가 표시됩니다:
-   **Opencode**
-   **Claude Code**
-   **Antigravity**
-   **Cursor**
-   **VS Code Copilot**
-   **Codex**
-   **Windsurf**
-   **Cline**
-   **Gemini CLI**

이 작업은 환경을 확인하고 필요한 Conductor 파일을 설치합니다:
-   **Commands:** 에이전트가 실행할 수 있는 에이전트별 프롬프트 또는 명령 파일 (예: `.opencode/commands/conductor:setup.md` 또는 `.gemini/commands/conductor:setup.toml`).
-   **Templates:** 워크플로우 가이드 및 스타일 가이드 (예: `.opencode/conductor/templates/`).

### 3. 에이전트와 함께 Conductor 사용

설치가 완료되면 설치된 명령이나 제공된 스킬 파일을 사용하여 AI 에이전트에게 Conductor 작업을 수행하도록 지시할 수 있습니다. 예를 들어:

- `@agent /conductor-setup` — 프로젝트 구조를 초기화합니다. (skill: `.agents/skills/conductor-setup/SKILL.md`)
- `@agent /conductor-newTrack` — 새로운 기능 또는 버그 수정 트랙을 시작합니다. (skill: `.agents/skills/conductor-newTrack/SKILL.md`)
- `@agent /conductor-implement` — 선택한 트랙을 구현합니다. (skill: `.agents/skills/conductor-implement/SKILL.md`)
- `@agent /conductor-status` — 현재 트랙의 상태를 확인합니다. (skill: `.agents/skills/conductor-status/SKILL.md`)
- `@agent /conductor-review` — 트랙 검토 프로토콜을 실행합니다. (skill: `.agents/skills/conductor-review/SKILL.md`)
- `@agent /conductor-revert` — 트랙 관련 변경을 되돌립니다. (skill: `.agents/skills/conductor-revert/SKILL.md`)

*참고: 많은 에이전트는 스킬 파일을 열어(예: `.agents/skills/conductor-implement/SKILL.md`) 스킬을 실행하거나 에이전트 UI에서 스킬 이름을 선택/실행할 수 있습니다. 스킬에는 권장되는 슬래시 호출이 포함되어 있어 짧은 명령 형식도 사용할 수 있습니다.*



## 🙏 감사의 말

이 프로젝트는 원래 **Gemini CLI**를 위해 개발된 [Conductor](https://github.com/gemini-cli-extensions/conductor) 방법론에서 영감을 받아 그 위에 구축되었습니다. 우리는 그 혜택을 더 넓은 개발자 생태계로 확장하는 것을 목표로 합니다.
