import { describe, expect, it } from 'vitest'
import { Unit, unit_time, unit_cny, unit_usd, unit_byte } from '../src/index'


describe('unit_time', () => {
  it('ms, s, min, h, d 换算', () => {
    expect(unit_time.ms(1000)).toBe(1000)
    expect(unit_time.s(1)).toBe(1000)
    expect(unit_time.min(1)).toBe(60000)
    expect(unit_time.h(1)).toBe(3600000)
    expect(unit_time.d(1)).toBe(86400000)
  })
})

describe('unit_cny', () => {
  it('fen/yuan 换算', () => {
    expect(unit_cny.fen(100)).toBe(100)
    expect(unit_cny.yuan(1)).toBe(100)
    expect(unit_cny.yuan(1.235)).toBe(124)
  })
})

describe('unit_usd', () => {
  it('cent/dollar 换算', () => {
    expect(unit_usd.cent(100)).toBe(100)
    expect(unit_usd.dollar(1)).toBe(100)
    expect(unit_usd.dollar(1.235)).toBe(124)
  })
})

describe('unit_byte', () => {
  it('b, kb, mb, gb, tb 换算', () => {
    expect(unit_byte.kb(1)).toBe(1)
    expect(unit_byte.mb(1)).toBe(1024)
    expect(unit_byte.gb(1)).toBe(1048576)
    expect(unit_byte.tb(1)).toBe(1073741824)
    expect(unit_byte.b(1024)).toBe(1)
    expect(unit_byte.b(1536)).toBe(1.5)
    expect(unit_byte.b(800)).toBe(0.78)
  })
})


describe('Unit 错误用例', () => {
  it('Unit rule does not have two units', () => {
    expect(() => Unit({})).toThrowError('Unit rule must have at least two units defined.')
  })

  it('Base unit is not defined in the rule.', () => {
    // @ts-expect-error base 不存在于 rule
    expect(() => Unit({ a: 1, b: 10 }, 'c')).toThrowError('Base unit "c" is not defined in the rule.')
  })

  it('No found value is equal to 1 in the rule, and no baseUnit is provided.', () => {
    expect(() => Unit({ a: 2, b: 10 })).toThrowError('No found value is equal to 1 in the rule, and no baseUnit is provided. Please provide a baseUnit or ensure one of the rule values is 1.')
  })

})
