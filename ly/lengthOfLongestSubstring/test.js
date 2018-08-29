const fn = require('./index')
const should = require('should')

const testCases = [
    {
        str: 'abcabcbb',
        result: 3
    },
    {
        str: '',
        result: 0
    },
    {
        str: ' ',
        result: 1
    },
    {
        str: 'ab',
        result: 2
    },
    {
        str: 'abcabcbb',
        result: 3
    },
]

describe('获取最长子串的长度', () => {
    testCases.forEach(({ str, result }) => {
        it(`"${str}"：${result}`, () => {
            should(fn(str))
                .be.a.Number()
                .and.equal(result)
        })
    })
})
