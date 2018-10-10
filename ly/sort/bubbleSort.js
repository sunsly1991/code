/*
 * 冒泡排序
 * @Author: ly
 * @Date: 2018-10-10 14:13:07
 * @Last Modified by: ly
 * @Last Modified time: 2018-10-10 14:40:39
 */

/**
 * @param {array} arr
 * @return {array}
 */
const bubbleSort = (arr = []) => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j)
            }
        }
    }
    return arr
}

function swap (arr, i, j) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp

    return arr
}

module.exports = bubbleSort
