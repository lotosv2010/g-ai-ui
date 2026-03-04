---
title: 工具函数
order: 2
---

# 工具函数

Turborepo Demo 提供了一些常用的工具函数，帮助提升开发效率。

## merge

合并多个对象。

### 使用方法

```typescript
import { merge } from '@g-ai-ui/utils'

const obj1 = { a: 1, b: 2 }
const obj2 = { c: 3, d: 4 }
const merged = merge(obj1, obj2)

console.log(merged)
// { a: 1, b: 2, c: 3, d: 4 }
```

### 类型签名

```typescript
function merge<T extends Record<string, any>>(...targets: T[]): T
```

## shallowCopy

浅拷贝对象。

### 使用方法

```typescript
import { shallowCopy } from '@g-ai-ui/utils'

const original = { a: 1, b: 2 }
const copy = shallowCopy(original)

console.log(copy)
// { a: 1, b: 2 }
```

### 类型签名

```typescript
function shallowCopy<T>(obj: T): T
```
