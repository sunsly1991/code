/*

    完成一个 extractStr 函数，可以把一个字符串中所有的 : 到 . 的子串解析出来并且存放到一个数组当中，例如：

    extractStr('My name is:Jerry. My age is:12.') // => ['Jerry', '12']
    注意，: 和 . 之间不包含 : 和 .。也即是说，如果 ::abc..，则返回 ['abc']。

    （本题来源：《JavaScript Cookbook》）
 * @Author: ly
 * @Date: 2018-11-15 15:45:36
 * @Last Modified by: ly
 * @Last Modified time: 2018-11-15 16:01:58
 */

const extractStr = (str) => {
    const arr = str.split(':').splice(1).map((sub) => {
        const r = sub.split('.')

        return r.length > 1 ? r[0] : null
    }).filter((sub) => {
        return sub !== null
    })

    return arr
}

module.exports = extractStr
