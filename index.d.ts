import * as ulib from 'utility-types'
import * as generated from './generated'

/**
 * Permitted bound
 */
export type RangeBound = generated.RangeBound

/**
 * Create a union from tuple's element
 * @example `FromTuple<[0, 1, 2]>` → `0 | 1 | 2`
 * @example `FromTuple<'x'[]>` → `'x'`
 * @example `FromTuple<[0, 1, 2, ...'x'[]]` → `0 | 1 | 2 | 'x'`
 */
export type FromTuple<Tuple extends any[]> = Tuple[number]

/**
 * Create a union of range from 0 to `Max`, excluding `Max`
 * @example `RangeZero<5>` → `0 | 1 | 2 | 3 | 4`
 */
export type RangeZero<Max extends RangeBound> = generated.RangeSet[Max]

/**
 * Create a union of range from `Min` to `Max`, including `Min`, excluding `Max`
 * @example `Range<3, 7>` → `3 | 4 | 5 | 6`
 */
export type Range<Min extends RangeBound, Max extends RangeBound> =
  ulib.SetDifference<RangeZero<Max>, RangeZero<Min>>
