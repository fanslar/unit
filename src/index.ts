type Handler<R = unknown> = (n: number) => R

type UnitConverter<
  T extends Record<string, number>,
  H extends readonly [Handler, Handler] | undefined = undefined,
> = H extends readonly [Handler<infer R1>, Handler<infer R2>]
  ? {
    [K in keyof T]: (value: number) => R1
  } & {
    [K in keyof T as `$${string & K}`]: (value: number) => R2
  }
  : {
    [K in keyof T]: (value: number) => number
  } & {
    [K in keyof T as `$${string & K}`]: (value: number) => number
  }

// 重载版本：无handlers
export function Unit<
  T extends Record<string, number>,
  K extends keyof T & string = keyof T & string,
>(
  rules: T,
  unit?: K | number,
): UnitConverter<T, undefined>

// 重载版本：有handlers
export function Unit<
  T extends Record<string, number>,
  K extends keyof T & string = keyof T & string,
  H extends readonly [Handler, Handler] | undefined = undefined,
>(
  rules: T,
  unit: K | number,
  handlers: H,
): UnitConverter<T, H>

// 实现
export function Unit<
  T extends Record<string, number>,
  K extends keyof T & string = keyof T & string,
  H extends readonly [Handler, Handler] | undefined = undefined,
>(
  rules: T,
  unit: K | number = 1,
  handlers?: H,
): UnitConverter<T, H> {
  const base = typeof unit === 'number' ? unit : rules[unit]

  const rulesKeys = Object.keys(rules) as K[]

  const Unit = Object.create(null)

  function runHandler(v: number, type: 0 | 1): unknown | number {
    if (handlers)
      return handlers[type](v)
    else
      return v
  }

  rulesKeys.forEach((ruleKey) => {
    const ruleValue = rules[ruleKey]
    // 简单转换函数（返回数值）
    Unit[ruleKey] = (out: number) => runHandler((out * ruleValue) / base, 0)
    Unit[`$${ruleKey}`] = (out: number) => runHandler((out * base) / ruleValue, 1)
  })

  return Unit
}

export default Unit
