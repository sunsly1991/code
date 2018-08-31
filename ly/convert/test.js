const fn = require('./index')
const should = require('should')

const testCases = [
    {
        args: ['PAYPALISHIRING', 3],
        result: ['PAHNAPLSIIGYIR']
    },
    {
        args: ['PAYPALISHIRING', 4],
        result: ['PINALSIGYAHRPI']
    },
]

describe('Z字形变换', () => {
    testCases.forEach(({ args, result }) => {
        it(`"${args[0]}"：${result}`, () => {
            should(fn(...args))
                .be.a.String()
                .and.equalOneOf(result)
        })
    })
})
