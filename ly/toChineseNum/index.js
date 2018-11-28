/*
 * @Author: ly
 * @Date: 2018-11-15 16:08:37
 * @Last Modified by: ly
 * @Last Modified time: 2018-11-15 18:24:52
 *
    完成将 toChineseNum， 可以将数字转换成中文大写的表示，处理到万级别，例如 toChineseNum(12345)，返回 一万二千三百四十五。
 */

const toChineseNum = (num) => {
    const defaultGet = ({ text, unit }) => text + unit
    const numMap = {
        1: {
            text: '一',
            get: ({ arr, index, text, unit }) => {
                // const left = arr.slice(0, index)
                // const right = arr.slice(index + 1)

                // if (!left.length && unit === '十') return unit

                return text + unit
            }
        },
        2: {
            text: '二',
            get: defaultGet
        },
        3: {
            text: '三',
            get: defaultGet
        },
        4: {
            text: '四',
            get: defaultGet
        },
        5: {
            text: '五',
            get: defaultGet
        },
        6: {
            text: '六',
            get: defaultGet
        },
        7: {
            text: '七',
            get: defaultGet
        },
        8: {
            text: '八',
            get: defaultGet
        },
        9: {
            text: '九',
            get: defaultGet
        },
        0: {
            text: '零',
            get: ({ arr, index, text, unit }) => {
                // const left = arr.slice(0, index)
                const right = arr.slice(index + 1)

                // 如果当前是万、亿
                if (right.length % 4 === 0) return unit
                if (right.every(c => c === '0')) return ''
                // 后一位为0
                if (right[0] === '0') return ''

                return text
            }
        },
    }
    const arr = num.toString().split('')
    const units = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万'].slice(0, arr.length).reverse()

    return arr.map((c, i) => {
        const unit = units.shift()
        const ch = numMap[c]
        return ch.get({
            arr,
            index: i,
            unit,
            text: ch.text,
        })
    }).join('')
}

module.exports = toChineseNum
