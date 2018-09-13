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
  export type FromFiniteTuple<Tuple extends any[]> = {
    empty: never,
    //@ts-ignore
    nonEmpty: ((..._: Tuple) => any) extends ((_: infer First, ..._1: infer Rest) => any)
      ? First | FromFiniteTuple<Rest>
      : never
  }[
    Tuple extends [] ? 'empty' : 'nonEmpty'
  ]

  export type FromInfiniteTuple<
    Tuple extends any[],
    Splitted extends boolean = false,
    Pair = never,
  > = {
    'splitted': Pair extends [infer Finite, infer Infinite] ?
      Finite extends any[] ?
      Infinite extends (infer RepeatedElement)[] ?
        FromFiniteTuple<Finite> | RepeatedElement
      : never
      : never
      : never,
    'unsplitted': FromInfiniteTuple<Tuple, true, tuple.SplitInfiniteTuple<Tuple>>
  }[
    Splitted extends true ? 'splitted' : 'unsplitted'
  ]

  export type FromTuple<Tuple extends any[]> =
    tuple.IsFinite<Tuple, FromFiniteTuple<Tuple>, FromInfiniteTuple<Tuple>>

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
    ulib.SetDifference<RangeZero<Ceiling>, RangeZero<Floor>>
}
