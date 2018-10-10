/*
    快排

 * @Author: ly
 * @Date: 2018-08-28 15:01:34
 * @Last Modified by: ly
 * @Last Modified time: 2018-10-10 14:10:36
 */

/**
 * @param {array} arr
 * @return {array}
 */
var quickSort = (arr = []) => {
    let flag = arr[0]
    let left = 1
    let right = arr.length - 1
    if (arr.length === 1 || arr.length === 0) {
        return arr
    }
    // console.log('\n', arr, '=>')
    while (true) {
        if (left === right) {
            if (arr[0] > arr[left]) {
                swap(arr, 0, left)
            } else {
                left = right = 0
            }
            break
        }

        if (arr[right] >= flag) {
            right--
            continue
        }

        if (arr[left] <= flag) {
            left++
            continue
        }

        swap(arr, left, right)
    }

    // console.log(arr)
    return [].concat(
        quickSort(arr.slice(0, left)),
        [flag],
        quickSort(arr.slice(right + 1))
    )
}

function swap (arr, i, j) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp

    return arr
}

// function swapIfMoreThan (arr, i, j) {
//     if (arr[i] > arr[j]) {
//         swap(arr, i, j)
//     }

//     return arr
// }

module.exports = quickSort
