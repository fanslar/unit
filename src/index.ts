/**
 * 银行家舍入法（四舍六入五成双）
 * @param n 需要舍入的数字
 * @param fractionDigits 保留的小数位数，默认0
 * @returns 舍入后的数字
 */
export function bankersRound(n: number, fractionDigits = 0): number {
  const factor = (10 ** fractionDigits)
  const temp = n * factor
  const floor = Math.floor(temp)
  const diff = temp - floor

  if (diff < 0.5) {
    return floor / factor
  }
  if (diff > 0.5) {
    return (floor + 1) / factor
  }
  // diff === 0.5
  // 判断floor是偶数还是奇数
  if (floor % 2 === 0) {
    return floor / factor
  } else {
    return (floor + 1) / factor
  }
}

/**
 * 单位换算工具函数
 * @param rule 单位规则对象，键为单位名，值为与基础单位的换算比
 * @param baseUnit 可选，基础单位名，默认为rule中值等于1的键
 * @param reviver 可选，结果处理函数
 * @returns 一个对象，键为单位名，值为换算函数
 */
export function Unit<
  R extends Record<string, number>,
  K extends keyof R = keyof R
>(
  rule: R,
  baseUnit?: K,
  reviver?: (n: number) => number
): Record<keyof R, (n: number) => number> {
  const keys = Object.keys(rule);
  if( keys.length <= 1) {
    throw new Error('Unit rule must have at least two units defined.');
  }
  if (baseUnit && !rule[baseUnit]) {
    throw new Error(`Base unit "${baseUnit.toString()}" is not defined in the rule.`);
  }
  const baseUnitValue = baseUnit ? rule[baseUnit] : Object.values(rule).find(value => value === 1);
  if (baseUnitValue === undefined) {
    throw new Error('No found value is equal to 1 in the rule, and no baseUnit is provided. Please provide a baseUnit or ensure one of the rule values is 1.');
  }
  return Object.fromEntries(
    keys.map((key) => {
      const value = rule[key];
      return [
        key,
        (n: number) => {
          const v = n * value / baseUnitValue
          if (reviver) {
            return reviver(v)
          }
          return bankersRound(v)
        },
      ];
    })
  ) as Record<keyof R, (n: number) => number>
}

/**
 * 时间单位换算
 * @example
 * unit_time.s(1) // 1000
 */
export const unit_time = Unit({
  ms: 1,
  s: 1000,
  min: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
})

/**
 * 人民币单位换算
 * @example
 * unit_cny.yuan(1) // 100
 */
export const unit_cny = Unit({
  fen: 1,
  yuan: 100,
})

/**
 * 美元单位换算
 * @example
 * unit_usd.dollar(1) // 100
 */
export const unit_usd = Unit({
  cent: 1,
  dollar: 100,
})

/**
 * 字节单位换算，结果保留两位小数
 * @example
 * unit_byte.mb(1) // 1024.00
 */
export const unit_byte = Unit({
  b: 1,
  kb: 1024,
  mb: 1024 * 1024,
  gb: 1024 * 1024 * 1024,
  tb: 1024 * 1024 * 1024 * 1024,
}, 'kb', (n) => parseFloat(n.toFixed(2)))




