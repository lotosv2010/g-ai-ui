/**
 * 合并多个对象
 * @param targets - 要合并的对象
 * @returns 合并后的新对象
 */
export function merge<T extends Record<string, any>>(...targets: T[]): T {
  const result: any = {}

  for (const target of targets) {
    if (target && typeof target === 'object') {
      Object.assign(result, target)
    }
  }

  return result
}

/**
 * 浅拷贝对象
 * @param obj - 要拷贝的对象
 * @returns 拷贝后的新对象
 */
export function shallowCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.slice() as any
  }

  return Object.assign({}, obj)
}
