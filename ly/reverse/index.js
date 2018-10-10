/*
    给定一个 32 位有符号整数，将整数中的数字进行反转。

    示例 1:

    输入: 123
    输出: 321
    示例 2:

    输入: -123
    输出: -321
    示例 3:

    输入: 120
    输出: 21
    注意:

    假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。根据这个假设，如果反转后的整数溢出，则返回 0。

 * @Author: ly
 * @Date: 2018-08-28 15:01:34
 * @Last Modified by: ly
 * @Last Modified time: 2018-10-10 17:45:04
 */

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let symbol = ''
    let arr = x.toString().split('')
    if (arr[0] === '-' || arr[0] === '+') {
        symbol = arr.shift()
    }

    let result = symbol + arr.reverse().join('')
    result = parseInt(result)

    if (result >= (2 ** 31) || result < -(2 ** 31)) {
        return 0
    }

    return result
}

module.exports = reverse
