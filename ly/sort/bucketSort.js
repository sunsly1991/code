/*
    桶排序

 * @Author: ly
 * @Date: 2018-08-28 15:01:34
 * @Last Modified by: ly
 * @Last Modified time: 2018-10-10 14:06:43
 */

/**
 * @param {array} arr
 * @return {array}
 */
var bucketSort = (arr = []) => {
    let bucket = []
    let result = []

    for (let i in arr) {
        let num = arr[i]
        bucket[num] = bucket[num] ? bucket[num] + 1 : 1
    }

    console.log(bucket)

    for (let i in bucket) {
        if (bucket[i]) {
            for (let j = 0; j < bucket[i]; j++) {
                result.push(parseInt(i))
            }
        }
    }

    return result
}

module.exports = bucketSort
