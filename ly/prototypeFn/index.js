/*
 * @Author: ly
 * @Date: 2018-11-28 15:48:25
 * @Last Modified by: ly
 * @Last Modified time: 2018-11-28 16:06:39

    const a = [1, 2, 3, 4, 5]
    // Implement this
    a.multiply()
    console.log(a) // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]
 */

/* eslint-disable no-extend-native */
Array.prototype.multiply = function () {
    if (!this.length) return this

    const len = this.length
    for (let i = 0; i < len; i++) {
        this.push(Math.pow(this[i], 2))
    }
}
/* eslint-enable no-extend-native */

const a = [1, 2, 3, 4, 5]
// Implement this
a.multiply()
console.log(a) // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]
