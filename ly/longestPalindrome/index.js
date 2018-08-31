/*
    给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为1000。

    示例 1：

    输入: "babad"
    输出: "bab"
    注意: "aba"也是一个有效答案。
    示例 2：

    输入: "cbbd"
    输出: "bb"

 * @Author: ly
 * @Date: 2018-08-28 15:01:34
 * @Last Modified by: ly
 * @Last Modified time: 2018-08-30 21:16:05
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s = '') {
    if (s.length === 0) return ''
    if (s.length === 1) return s[0]

    let longest = ''
    let tmp = ''
    let tmp1 = ''
    for (let i = 0; i < s.length - 1; i++) {
        tmp = get(i, i + 1)
        if (tmp.length > longest.length) {
            longest = tmp
        }

        tmp1 = get(i, i)
        if (tmp1.length > longest.length) {
            longest = tmp1
        }
    }

    return longest

    function get (left, right) {
        if (left < 0 || right >= s.length || s[left] !== s[right]) {
            return s.substring(left + 1, right)
        }
        if (s[left] === s[right]) {
            return get(left - 1, right + 1)
        }
    }
}

module.exports = longestPalindrome
