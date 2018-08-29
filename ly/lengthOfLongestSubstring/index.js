/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (!s.length) return 0
    if (s.length === 1) return 1

    var sub = []
    var max = 0
    for (let c of s) {
        let cIndex = sub.indexOf(c)
        if (cIndex !== -1) {
            max = Math.max(sub.length, max)
            sub = sub.slice(cIndex + 1)
        }
        sub.push(c)
    }
    max = Math.max(sub.length, max)
    return max
}

module.exports = lengthOfLongestSubstring
