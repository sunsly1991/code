const fn = require('./index')
const should = require('should')

const testCases = [
    {
        args: [[1, 3], [2]],
        result: 2
    },
    {
        args: [[1, 3], [2, 4]],
        result: 2.5
    },
    {
        args: [[1], [2]],
        result: 1.5
    },
    {
        args: [[], [1, 2]],
        result: 1.5
    },
    {
        args: [[], [1, 2, 3]],
        result: 2
    },
    {
        args: [[1, 2], []],
        result: 1.5
    },
    {
        args: [[1, 2, 3], []],
        result: 2
    },
]

describe('两个排序数组的中位数', () => {
    testCases.forEach(({ args, result }) => {
        it(`"[${args[0]}] [${args[1]}]"：${result}`, () => {
            should(fn(...args))
                .be.a.Number()
                .and.equal(result)
        })
    })
})
