# Replicate Gemini Conductor Code Base

## Before You Start

Check if the `gemini-conductor-codebase` folder already exists in the project root directory.

If it does, please ask user if they want to overwrite it by prompting `The folder gemini-conductor-codebase already exists. Do you want to overwrite it? (y/n)` before proceeding.

If the user responds with 'y' or 'Yes' or any positive answer, delete the existing folder and continue with the replication process.

If the user responds with 'n' or 'No' or any negative answer, terminate the script without making any changes.

## Step 1: Extract files

To replicate the Gemini Conductor code base, we need to extract commands folder and templates folder from the original repository.

The original repository can be found at: [gemini-cli-extensions/conductor](https://github.com/gemini-cli-extensions/conductor)

```bash
# Download the zip file from the original repository
# https://github.com/gemini-cli-extensions/conductor/archive/refs/heads/main.zip
mkdir -p gemini-conductor-codebase
curl -L -o gemini-conductor-codebase/conductor.zip https://github.com/gemini-cli-extensions/conductor/archive/refs/heads/main.zip

# Unzip the downloaded file and extract only commands and templates folders
unzip gemini-conductor-codebase/conductor.zip -d gemini-conductor-codebase
mv gemini-conductor-codebase/conductor-main/commands/conductor gemini-conductor-codebase/commands
mv gemini-conductor-codebase/conductor-main/templates gemini-conductor-codebase/templates
mv gemini-conductor-codebase/conductor-main/GEMINI.md gemini-conductor-codebase/GEMINI.md

# clean up
rm gemini-conductor-codebase/conductor.zip
rm -rf gemini-conductor-codebase/conductor-main
```

## Step 2: Process files

Read through the extracted files and replace any gemini related install paths with a variable placeholder so that the our cli can replace them at runtime.

placeholder can be

to replace it, you can use my node script that plaed in scripts/replace.js

```bash
node scripts/replace.js --input gemini-conductor-codebase/commands/setup.toml --output gemini-conductor-codebase/commands/setup.toml
```

## Step 3: Verify

After processing the files, verify that all instances of the gemini related install paths have been replaced with the placeholder `__$$CODE_AGENT_INSTALL_PATH$$__`.
You can use grep or any text search tool to confirm this.

```bash
grep -r "~/.gemini/extensions/conductor" gemini-conductor-codebase/
```
