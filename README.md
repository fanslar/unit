# @fanslar/unit

[![npm version](https://img.shields.io/npm/v/@fanslar/unit)](https://www.npmjs.com/package/@fanslar/unit)
[![license](https://img.shields.io/npm/l/@fanslar/unit)](https://github.com/fanslar/unit/blob/main/LICENSE.md)
[![build status](https://img.shields.io/github/actions/workflow/status/fanslar/unit/ci.yml)](https://github.com/fanslar/unit/actions)

一个通用的单位转换工具库，支持时间、货币、字节等多种单位的灵活转换。

## ✨ 特性

- 🚀 **轻量级**：零依赖，体积小巧
- 🔧 **类型安全**：完整的 TypeScript 支持
- 🎯 **灵活配置**：支持自定义单位规则和转换处理器
- 📦 **开箱即用**：内置常用单位转换（时间、货币、字节）
- 🌳 **Tree-shakable**：支持按需引入

## 📦 安装

```bash
# 使用 npm
npm install @fanslar/unit

# 使用 pnpm
pnpm add @fanslar/unit

# 使用 yarn
yarn add @fanslar/unit
```

## 🚀 快速开始

### 基础用法

```typescript
import { Unit } from '@fanslar/unit'

// 创建一个时间单位转换器
const timeUnit = Unit({
  ms: 1,
  s: 1000,
  min: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
})

// 正向转换：转换为基础单位（毫秒）
console.log(timeUnit.s(1)) // 1000 (1秒 = 1000毫秒)
console.log(timeUnit.min(1)) // 60000 (1分钟 = 60000毫秒)
console.log(timeUnit.h(1)) // 3600000 (1小时 = 3600000毫秒)

// 反向转换：从基础单位转换为目标单位
console.log(timeUnit.$s(1000)) // 1 (1000毫秒 = 1秒)
console.log(timeUnit.$min(60000)) // 1 (60000毫秒 = 1分钟)
console.log(timeUnit.$h(3600000)) // 1 (3600000毫秒 = 1小时)
```

### 使用内置转换器

```typescript
import { unit_byte, unit_cny, unit_time } from '@fanslar/unit/example'

// 时间转换
console.log(unit_time.s(1)) // 1000 (1秒 = 1000毫秒)
console.log(unit_time.$s(1000)) // 1 (1000毫秒 = 1秒)

// 人民币转换
console.log(unit_cny.yuan(1)) // 100 (1元 = 100分)
console.log(unit_cny.$yuan(100)) // 1 (100分 = 1元)

// 字节转换
console.log(unit_byte.kb(1)) // 1024 (1KB = 1024B)
console.log(unit_byte.$kb(1024)) // 1 (1024B = 1KB)
```

## 📚 API 文档

### \`Unit(rules, unit?, handlers?)\`

创建一个单位转换器。

#### 参数

- \`rules: Record<string, number>\` - 单位规则对象，键为单位名称，值为相对于基础单位的倍数
- \`unit?: string | number\` - 基础单位名称或倍数，默认为 \`1\`
- \`handlers?: [Function, Function]\` - 可选的转换处理器数组，\`[正向转换处理器, 反向转换处理器]\`

#### 返回值

返回一个包含转换方法的对象：
- \`unitName(value)\` - 正向转换：将指定单位的值转换为基础单位
- \`$unitName(value)\` - 反向转换：将基础单位的值转换为指定单位

#### 示例

```typescript
// 创建字节转换器，以字节为基础单位
const byteUnit = Unit({
  b: 1,
  kb: 1024,
  mb: 1024 * 1024,
  gb: 1024 * 1024 * 1024,
}, 'b')

// 创建带处理器的货币转换器
const currencyUnit = Unit({
  fen: 1,
  yuan: 100,
}, 1, [
  Math.ceil, // 正向转换时向上取整
  n => Number.parseFloat(n.toFixed(2)) // 反向转换时保留两位小数
])
```

## 🛠️ 高级用法

### 自定义转换处理器

处理器可以用于格式化转换结果，比如取整、保留小数位等：

```typescript
const preciseByteUnit = Unit({
  b: 1,
  kb: 1024,
  mb: 1024 * 1024,
  gb: 1024 * 1024 * 1024,
}, 'b', [
  Math.ceil, // 正向转换向上取整
  n => Number.parseFloat(n.toFixed(2)) // 反向转换保留两位小数
])

console.log(preciseByteUnit.kb(1.5)) // 1536 (1.5KB = 1536B，向上取整)
console.log(preciseByteUnit.$kb(1536)) // 1.5 (1536B = 1.5KB，保留两位小数)
```

### 自定义基础单位

```typescript
// 以 KB 为基础单位的字节转换器
const kbUnit = Unit({
  b: 1,
  kb: 1024,
  mb: 1024 * 1024,
  gb: 1024 * 1024 * 1024,
}, 'kb')

console.log(kbUnit.mb(1)) // 1024 (1MB = 1024KB)
console.log(kbUnit.$mb(1024)) // 1 (1024KB = 1MB)
```

## 📋 内置转换器

### 时间单位转换 (\`unit_time\`)

```typescript
import { unit_time } from '@fanslar/unit/example'

// 支持的单位：ms(毫秒), s(秒), min(分钟), h(小时), d(天)
console.log(unit_time.s(1)) // 1000
console.log(unit_time.min(1)) // 60000
console.log(unit_time.h(1)) // 3600000
console.log(unit_time.d(1)) // 86400000
```

### 人民币单位转换 (\`unit_cny\`)

```typescript
import { unit_cny } from '@fanslar/unit/example'

// 支持的单位：fen(分), yuan(元)
// 正向转换时向上取整，反向转换时保留两位小数
console.log(unit_cny.yuan(1.235)) // 124 (1.235元 = 124分，向上取整)
console.log(unit_cny.$yuan(124)) // 1.24 (124分 = 1.24元)
```

### 字节单位转换 (\`unit_byte\`)

```typescript
import { unit_byte } from '@fanslar/unit/example'

// 支持的单位：b(字节), kb(千字节), mb(兆字节), gb(吉字节), tb(太字节)
// 转换结果向上取整
console.log(unit_byte.kb(1)) // 1024
console.log(unit_byte.mb(1)) // 1048576
console.log(unit_byte.gb(1)) // 1073741824
```

## 🧪 开发

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发脚本

```bash
# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck

# 发布
pnpm release
```

### 项目结构

```
├── src/
│   ├── index.ts     # 核心 Unit 函数
│   └── example.ts   # 内置转换器示例
├── test/
│   └── index.test.ts # 单元测试
├── dist/            # 构建输出
└── docs/            # 文档
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交你的更改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE.md) 许可证开源。

## 🔗 相关链接

- [GitHub 仓库](https://github.com/fanslar/unit)
- [NPM 包](https://www.npmjs.com/package/@fanslar/unit)
- [问题反馈](https://github.com/fanslar/unit/issues)

---

Made with ❤️ by [fanslar](https://github.com/fanslar)
