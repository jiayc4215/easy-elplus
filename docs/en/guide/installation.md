# Installation

## Environment Requirements

- Node.js >= 16.x
- Vue >= 3.x
- Element Plus >= 2.x

## Using Package Manager

We recommend using a package manager (such as npm, yarn, or pnpm) to install easy-elplus.

::: code-group

```bash [npm]
npm install easy-elplus
```

```bash [yarn]
yarn add easy-elplus
```

```bash [pnpm]
pnpm add easy-elplus
```

:::

## Install Element Plus

easy-elplus is built on top of Element Plus, so you need to install Element Plus first:

::: code-group

```bash [npm]
npm install element-plus
```

```bash [yarn]
yarn add element-plus
```

```bash [pnpm]
pnpm add element-plus
```

:::

## Build from Source

If you want to build easy-elplus from source:

```bash
# Clone the repository
git clone https://github.com/jiayc4215/easy-elplus.git

# Enter project directory
cd easy-elplus

# Install dependencies
pnpm install

# Build project
pnpm build
```

After building, the artifacts will be output to the `dist` directory.

## Development Environment

If you want to contribute to easy-elplus:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start documentation server
pnpm docs:dev
```

## Next Steps

After installation, please check [Quick Start](/en/guide/quickstart) to learn how to use easy-elplus in your project.
