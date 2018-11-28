/*
 * 给定一个数组排序，使得奇数位的值不大于相邻偶数位的值。
 * @Author: ly
 * @Date: 2018-11-12 11:57:08
 * @Last Modified by: ly
 * @Last Modified time: 2018-11-12 13:34:19
 */

function oddEvenSort (arr) {
    const sorted = arr.sort((a, b) => a - b)
    console.log(sorted)
    const r = []

    r.push(sorted.shift())
    while (true) {
        if (!sorted.length) break
        r.push(sorted[1])
        r.push(sorted[0])

        sorted.shift()
        sorted.shift()
    }

    return r
}

module.exports = oddEvenSort
