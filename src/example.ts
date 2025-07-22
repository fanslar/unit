import Unit from './index'

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
}, 1, [
  Math.ceil,
  (n: number) => Number.parseFloat(n.toFixed(2)),
])

/**
 * 字节单位换算
 * @example
 * unit_byte.mb(1) // 1024 * 1024
 */
export const unit_byte = Unit({
  b: 1,
  kb: 1024,
  mb: 1024 * 1024,
  gb: 1024 * 1024 * 1024,
  tb: 1024 * 1024 * 1024 * 1024,
}, 'b', [
  Math.ceil,
  Math.ceil,
])
