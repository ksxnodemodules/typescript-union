import * as ulib from 'utility-types'
import * as tuple from 'typescript-tuple'

/**
 * Create a union from tuple's element
 * @example `FromTuple<[0, 1, 2]>` → `0 | 1 | 2`
 * @example `FromTuple<'x'[]>` → `'x'`
 * @example `FromTuple<[0, 1, 2, ...'x'[]]` → `0 | 1 | 2 | 'x'`
 */
export type FromTuple<Tuple extends any[]> = utils.FromTuple<Tuple>

/**
 * Create a union of range from 0 to `Max`, excluding `Max`
 * @example `RangeZero<5>` → `0 | 1 | 2 | 3 | 4`
 */
export type RangeZero<Max extends number> = utils.RangeZero<Max>

/**
 * Create a union of range from `Min` to `Max`, including `Min`, excluding `Max`
 * @example `Range<3, 7>` → `3 | 4 | 5 | 6`
 */
export type Range<Min extends number, Max extends number> = utils.Range<Min, Max>

export namespace utils {
  export type FromTuple<Tuple extends any[]> =
    Tuple extends Iterable<infer X> ? X : never

  export type RangeZero<
    Ceiling extends number,
    Holder extends number = never,
    Counter extends any[] = []
  > = {
    matched: Holder,
    unmatched: RangeZero<Ceiling, Holder | Counter['length'], tuple.Prepend<Counter, any>>
  }[
    Counter['length'] extends Ceiling ? 'matched' : 'unmatched'
  ]

  export type Range<Floor extends number, Ceiling extends number> =
    RangeZero<Ceiling> extends infer A ?
    RangeZero<Floor> extends infer B ?
      ulib.SetDifference<A, B>
    : never
    : never
}
