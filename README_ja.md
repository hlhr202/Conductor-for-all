# Conductor for All

[![npm version](https://badge.fury.io/js/conductor-4-all.svg)](https://badge.fury.io/js/conductor-4-all)

<img src="./conductor_banner.png" height="400" alt="Conductor for All Banner" />

[English](./README.md) | [中文](./README_zh.md) | [日本語](./README_ja.md) | [한국어](./README_ko.md)

> [!IMPORTANT]
> **移行の推奨:** メンテナーは、新規および既存の skill ベースのワークフローを [hlhr202/swe-skills](https://github.com/hlhr202/swe-skills) へ移行することを推奨します。
>
> この推奨には明確な理由があります。Google の上流 Conductor エコシステムには、Google 独自の service 関連 skill catalog が導入されましたが、本プロジェクトではその catalog を参照または依存する意図はありません。`swe-skills` は Conductor のワークフローモデルを完全に継承しつつ、アーキテクチャ討論プロセスを追加しています。

**Conductor for All** は、[Conductor](https://github.com/gemini-cli-extensions/conductor) の仕様駆動型開発手法を *あらゆる* コーディング環境にもたらすために設計されたスタンドアロンのコマンドラインツールです。

もともと Gemini CLI 拡張機能に紐付いていたこのプロジェクトは、その手法を分離し、開発者が自分のプロジェクトに Conductor ワークフローをインストールして初期化できるようにすることで、**あらゆる** AI コーディングエージェント（Claude Code、Cursor、VS Code Copilot、Codex など）や IDE で活用できるようにすることを目指しています。

## 🎯 目標

-   **普遍的な互換性:** Gemini CLI エコシステム外で Conductor 手法を有効にします。
-   **エージェントに依存しないセットアップ:** Conductor のコマンドとテンプレートをプロジェクトに「インストール」するメカニズムを提供し、事実上、複数の異なるコーディングエージェントが利用できるように「有効化」します。
-   **標準化:** 人間の意図と AI の実行との間のギャップを埋める、プロジェクトオーケストレーションのための統一されたインターフェースを作成します。

## 🔧 Skills インストールモード（推奨）

Conductor は主に 2 つのインストール形式をサポートします："Slash Custom Prompts (Commands)" と "Skills"。多くのプロジェクトでは **Skills** を推奨します。

- **Skills の役割:** Conductor を agentskills.io 形式のスキルファイル（またはエージェント固有のスキルディレクトリ）としてインストールし、コマンドやワークフローを幅広い AI エージェントやツールから発見・利用可能にします。
- **Skills を推奨する理由:** エージェント間での移植性が高く、バージョン管理や配布が容易で、skill/skillpack の検出をサポートするエコシステムと相性が良いため、スラッシュコマンドの構文に依存しません。
- **例：インストール先:**
	- `.agents/skills/` — 汎用スキルディレクトリ（推奨）
	- `.claude/skills/` — Claude Code 用
	- `.gemini/skills/` — Gemini CLI / プロトコル用

インストーラー実行時は、推奨されるクロスエージェントインストールのために **Skills** を選択してください。

## 🚀 使用方法

### 1. プロジェクトでの Conductor のセットアップ

プロジェクトで Conductor を初期化するには、プロジェクトのルートで次のコマンドを実行するだけです：

```bash
npx conductor-4-all install
```

### 2. 代替手段：ソースからビルド

ソースからビルドする場合：

```bash
pnpm install
pnpm build
node dist/index.js install
```

AI コーディングエージェントを選択するように求められます：
-   **Opencode**
-   **Claude Code**
-   **Antigravity**
-   **Cursor**
-   **VS Code Copilot**
-   **Codex**
-   **Windsurf**
-   **Cline**
-   **Gemini CLI**

これにより、環境が検証され、必要な Conductor ファイルがインストールされます：
-   **Commands:** エージェントが実行できるエージェント固有のプロンプトまたはコマンドファイル（例：`.opencode/commands/conductor:setup.md` または `.gemini/commands/conductor:setup.toml`）。
-   **Templates:** ワークフローガイドとスタイルガイド（例：`.opencode/conductor/templates/`）。

### 3. エージェントでの Conductor の使用

インストールが完了すると、インストールされたコマンドや提供されたスキルファイルを使って Conductor タスクを実行するよう AI エージェントに指示できます。例えば：

- `@agent /conductor-setup` — プロジェクト構造を初期化します。 (skill: `.agents/skills/conductor-setup/SKILL.md`)
- `@agent /conductor-newTrack` — 新しい機能またはバグ修正トラックを開始します。 (skill: `.agents/skills/conductor-newTrack/SKILL.md`)
- `@agent /conductor-implement` — 選択したトラックを実装します。 (skill: `.agents/skills/conductor-implement/SKILL.md`)
- `@agent /conductor-status` — 現在のトラックのステータスを確認します。 (skill: `.agents/skills/conductor-status/SKILL.md`)
- `@agent /conductor-review` — トラックのレビュー プロトコルを実行します。 (skill: `.agents/skills/conductor-review/SKILL.md`)
- `@agent /conductor-revert` — トラックに関連する変更を元に戻します。 (skill: `.agents/skills/conductor-revert/SKILL.md`)

*注：多くのエージェントはスキルファイルを開くことでスキルを実行できます（例：`.agents/skills/conductor-implement/SKILL.md`を開く）、またはエージェントの UI でスキル名を選択/実行できます。スキルには推奨されるスラッシュ呼び出しが含まれている場合があり、短いコマンド形式も使用できます。*



## 🙏 謝辞

このプロジェクトは、**Gemini CLI** のために最初に開発された [Conductor](https://github.com/gemini-cli-extensions/conductor) 手法に触発され、それに基づいています。私たちはその利点をより広い開発者エコシステムに拡大することを目指しています。
