const fn = require('./index')
const should = require('should')

const testCases = [
    {
        args: [1],
        result: ['一']
    },
    {
        args: [10],
        result: ['一十']
    },
    {
        args: [1001001],
        result: ['一百万一千零一']
    },
    {
        args: [1111111001001],
        result: ['一万一千一百一十一亿一千一百万一千零一']
    },
    {
        args: [101001],
        result: ['一十万一千零一']
    },
    {
        args: [72100000],
        result: ['七千二百一十万']
    },
]

describe('中文数字', () => {
    testCases.forEach(({ args, result }) => {
        it(`"${args[0]}"：${result}`, () => {
            should(fn(...args))
                .be.a.String()
                .and.equalOneOf(result)
        })
    })
})
