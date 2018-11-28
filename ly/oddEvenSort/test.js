const fn = require('./index')
const should = require('should')

const testCases = [
    {
        args: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        result: [1, 3, 2, 5, 4, 7, 6, 9, 8]
    },
]

describe('给定一个数组排序，使得奇数位的值不大于相邻偶数位的值：', () => {
    testCases.forEach(({ args, result }) => {
        it(`"${args}"：${result}`, () => {
            should(fn(args))
                .be.a.Array()
                .and.eql(result)
        })
    })
})
