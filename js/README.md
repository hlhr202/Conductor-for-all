# Conductor CLI (Node.js)

The TypeScript/Node.js implementation of the Conductor CLI, a spec-driven development framework.

## Installation

```bash
npm install -g conductor-4-all
```

## Usage

Initialize a new Conductor project:

```bash
conductor install <target-directory>
```

Example:

```bash
conductor install ./my-new-function
```

## Development

1. Setup:
   ```bash
   cd js
   npm install
   ```

2. Test:
   ```bash
   npm test
   ```

3. Build:
   ```bash
   npm run build
   ```

4. Run locally:
   ```bash
   npm start -- install ../test-project
   # OR
   node dist/index.js install ../test-project
   ```

## License

MIT
