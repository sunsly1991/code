/*
    将字符串 "PAYPALISHIRING" 以Z字形排列成给定的行数：

    P   A   H   N
    A P L S I I G
    Y   I   R
    之后从左往右，逐行读取字符："PAHNAPLSIIGYIR"

    实现一个将字符串进行指定行数变换的函数:

    string convert(string s, int numRows);
    示例 1:

    输入: s = "PAYPALISHIRING", numRows = 3
    输出: "PAHNAPLSIIGYIR"
    示例 2:

    输入: s = "PAYPALISHIRING", numRows = 4
    输出: "PINALSIGYAHRPI"
    解释:

    P     I    N
    A   L S  I G
    Y A   H R
    P     I
 * @Author: ly
 * @Date: 2018-08-31 15:17:02
 * @Last Modified by: ly
 * @Last Modified time: 2018-08-31 18:32:44
 */
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows = 1) {
    if (numRows === 1) return s
    const arr = []
    let arrI = 0
    let delta = 1
    s.split('').map((c, i) => {
        if (arr[arrI]) {
            arr[arrI] += c
        } else {
            arr[arrI] = c
        }

        if (arrI === 0) delta = 1
        if (arrI === numRows - 1) delta = -1
        arrI += delta
    })

    return arr.join('')
}

module.exports = convert
