const path = require('path')
const fs = require('fs')

const target = path.join(__dirname, 'generated.d.ts')

/**
 * Create a range union
 * @param {number} ceiling Ceiling
 */
const Range = ceiling => ceiling
  ? Array(ceiling).fill(0).map((_, i) => i).join(' | ')
  : 'never'

/**
 * Create a range set
 */
function* RangeSet() {
  const RANGE_MAX_CEILING = 64
  yield `export type RangeMaxCeiling = ${RANGE_MAX_CEILING}`
  yield `export type RangeBound = ${Range(RANGE_MAX_CEILING)}`

  yield 'export type RangeSet = ['
  for (let ceiling = 0; ceiling <= RANGE_MAX_CEILING; ++ceiling) {
    yield ' '.repeat(2) + Range(ceiling) + ','
  }
  yield ']'
}

fs.writeFileSync(target, [...RangeSet()].join('\n') + '\n')
