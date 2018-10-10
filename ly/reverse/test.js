const fn = require('./index')
const should = require('should')

const testCases = [
    {
        args: [123],
        result: [321]
    },
    {
        args: [-321],
        result: [-123]
    },
    {
        args: [2147483648],
        result: [0]
    },
    {
        args: [-2147483648],
        result: [0]
    },
]

describe('反转整数', () => {
    testCases.forEach(({ args, result }) => {
        it(`"${args[0]}"：${result}`, () => {
            should(fn(...args))
                .be.a.Number()
                .and.equalOneOf(result)
        })
    })
})
