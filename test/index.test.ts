import { describe, expect, it } from 'vitest'
import { unit_byte, unit_cny, unit_time } from '../src/example'
import { Unit } from '../src/index'

describe('unit_time', () => {
  it('unit_time 换算', () => {
    expect(unit_time.ms(1000)).toBe(1000)
    expect(unit_time.s(1)).toBe(1000)
    expect(unit_time.min(1)).toBe(60000)
    expect(unit_time.h(1)).toBe(3600000)
    expect(unit_time.d(1)).toBe(86400000)

    expect(unit_time.$ms(1000)).toBe(1000)
    expect(unit_time.$s(1000)).toBe(1)
    expect(unit_time.$min(60000)).toBe(1)
    expect(unit_time.$h(3600000)).toBe(1)
    expect(unit_time.$d(86400000)).toBe(1)
  })
})

describe('unit_cny', () => {
  it('unit_cny 换算', () => {
    expect(unit_cny.fen(100)).toBe(100)
    expect(unit_cny.yuan(1)).toBe(100)
    expect(unit_cny.yuan(1.231)).toBe(124)
    expect(unit_cny.yuan(1.235)).toBe(124)

    expect(unit_cny.$fen(100)).toBe(100)
    expect(unit_cny.$yuan(100)).toBe(1)
    expect(unit_cny.$yuan(124)).toBe(1.24)
  })
})

describe('unit_byte', () => {
  it('unit_byte 换算', () => {
    expect(unit_byte.b(1)).toBe(1)
    expect(unit_byte.b(1.5)).toBe(2)
    expect(unit_byte.kb(1)).toBe(1024)
    expect(unit_byte.mb(1)).toBe(1024 * 1024)
    expect(unit_byte.gb(1)).toBe(1024 * 1024 * 1024)
    expect(unit_byte.tb(1)).toBe(1024 * 1024 * 1024 * 1024)

    expect(unit_byte.$b(1)).toBe(1)
    expect(unit_byte.$b(2.5)).toBe(3)
    expect(unit_byte.$kb(1024)).toBe(1)
    expect(unit_byte.$mb(1024 * 1024)).toBe(1)
    expect(unit_byte.$gb(1024 * 1024 * 1024)).toBe(1)
    expect(unit_byte.$tb(1024 * 1024 * 1024 * 1024)).toBe(1)
  })
})

const unit_kb = Unit({
  b: 1,
  kb: 1024,
  mb: 1024 * 1024,
  gb: 1024 * 1024 * 1024,
  tb: 1024 * 1024 * 1024 * 1024,
}, 'kb', [
  n => Number.parseFloat(n.toFixed(2)),
  n => Number.parseFloat(n.toFixed(2)),
])
describe('unit_kb', () => {
  it('unit_kb 换算', () => {
    expect(unit_kb.kb(1)).toBe(1)
    expect(unit_kb.mb(1)).toBe(1024)
    expect(unit_kb.gb(1)).toBe(1048576)
    expect(unit_kb.tb(1)).toBe(1073741824)
    expect(unit_kb.b(1024)).toBe(1)
    expect(unit_kb.b(1536)).toBe(1.5)
    expect(unit_kb.b(800)).toBe(0.78)

    expect(unit_kb.$kb(1)).toBe(1)
    expect(unit_kb.$mb(1024)).toBe(1)
    expect(unit_kb.$gb(1048576)).toBe(1)
    expect(unit_kb.$tb(1073741824)).toBe(1)
    expect(unit_kb.$b(1)).toBe(1024)
    expect(unit_kb.$b(1.5)).toBe(1536)
    expect(unit_kb.$b(0.78)).toBe(798.72)
  })
})
