/*
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2 。
 * 请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log (m+n)) 。
 * 你可以假设 nums1 和 nums2 不同时为空。
 * 示例 1:
 * nums1 = [1, 3]
 * nums2 = [2]
 * 中位数是 2.0
 * 示例 2:
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * 中位数是 (2 + 3)/2 = 2.5
 *
 * @Author: ly
 * @Date: 2018-08-27 18:26:14
 * @Last Modified by: ly
 * @Last Modified time: 2018-08-28 09:59:23
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    var lastNum1
    var lastNum2
    var r = []

    var medianIndex = getMedianIndexTwoArrays(nums1, nums2)
    console.log(`${nums1} ${nums2} 中位数`, medianIndex)
    for (var i1 = 0, i2 = 0; i1 < nums1.length || i2 < nums2.length;) {
        lastNum1 = nums1[i1]
        lastNum2 = nums2[i2]

        if (lastNum2 === undefined || lastNum1 < lastNum2) {
            r.push(lastNum1)
            i1++
        } else {
            r.push(lastNum2)
            i2++
        }

        console.log(r)
        if (medianIndex[1] < r.length) {
            return (r[medianIndex[0]] + r[medianIndex[1]]) / 2
        }
    }
}

function getMedianIndexTwoArrays (nums1, nums2) {
    var medianIndex = (nums1.length + nums2.length) / 2
    if (medianIndex % 1 === 0) {
        return [medianIndex - 1, medianIndex]
    } else {
        return [parseInt(medianIndex), parseInt(medianIndex)]
    }
}

module.exports = findMedianSortedArrays
