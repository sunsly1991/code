const should = require('should')

const data = require('./data')
console.log(data.data)
const testCases = [
    {
        args: [
            data.data
        ],
        result: [
            data.result
        ]
    }
]

// describe('快排', () => {
//     testCases.forEach(({ args, result }) => {
//         it(`"${args[0]}"：${result}`, () => {
//             should(require('./quickSort')(...args))
//                 .be.a.Array()
//                 .and.oneOf(result)
//         })
//     })
// })

// describe('桶排序', () => {
//     testCases.forEach(({ args, result }) => {
//         it(`"${args[0]}"：${result}`, () => {
//             should(require('./bucketSort')(...args))
//                 .be.a.Array()
//                 .and.oneOf(result)
//         })
//     })
// })

describe('冒泡排序', () => {
    testCases.forEach(({ args, result }) => {
        it(`"${args[0]}"：${result}`, () => {
            should(require('./bubbleSort')(...args))
                .be.a.Array()
                .and.oneOf(result)
        })
    })
})
