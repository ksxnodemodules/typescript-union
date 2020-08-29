import { compare } from 'static-type-assert'

import {
  FromTuple,
  RangeZero,
  Range
} from './index'

compare<FromTuple<[0, 1, 2, 'a', 'b']>, 0 | 1 | 2 | 'a' | 'b'>('equal')
compare<FromTuple<'x'[]>, 'x'>('equal')
compare<FromTuple<[0, 1, 2, ...'x'[]]>, 0 | 1 | 2 | 'x'>('equal')

compare<RangeZero<0>, never>('equal')
compare<RangeZero<5>, 0 | 1 | 2 | 3 | 4>('equal')

compare<Range<0, 0>, RangeZero<0>>('equal')
compare<Range<5, 5>, RangeZero<0>>('equal')
compare<Range<0, 5>, RangeZero<5>>('equal')
compare<Range<3, 7>, 3 | 4 | 5 | 6>('equal')
