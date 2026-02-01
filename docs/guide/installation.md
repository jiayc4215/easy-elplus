# 安装

## 环境要求

- Node.js >= 16.x
- Vue >= 3.x
- Element Plus >= 2.x

## 使用包管理器

我们建议使用包管理器（如 npm、yarn 或 pnpm）安装 Easy ElPlus。

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

## 安装 Element Plus

Easy ElPlus 是基于 Element Plus 构建的，因此你需要先安装 Element Plus：

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

## 从源码构建

如果你想从源码构建 Easy ElPlus：

```bash
# 克隆仓库
git clone https://github.com/jiayc4215/element-plus-easy.git

# 进入项目目录
cd element-plus-easy

# 安装依赖
pnpm install

# 构建项目
pnpm build
```

构建完成后，产物将输出到 `dist` 目录。

## 开发环境

如果你想参与 Easy ElPlus 的开发：

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动文档服务器
pnpm docs:dev
```

## 下一步

安装完成后，请查看 [快速开始](/guide/quickstart) 了解如何在项目中使用 Easy ElPlus。
