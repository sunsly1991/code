/*
    斐波那契数列指的是类似于以下的数列：

    1, 1, 2, 3, 5, 8, 13, ....
    也就是，第 n 个数由数列的前两个相加而来：f(n) = f(n - 1) + f(n -2)

    请你完成 fibonacci 函数，接受 n 作为参数，可以获取数列中第 n 个数，例如：

    fibonacci(1) // => 1
    fibonacci(2) // => 1
    fibonacci(3) // => 2
    ...
    测试程序会从按顺序依次获取斐波那契数列中的数，请注意程序不要超时，也不要添加额外的全局变量。

    本题来源：《JavaScript 语言精髓》
 * @Author: ly
 * @Date: 2018-11-15 13:53:48
 * @Last Modified by: ly
 * @Last Modified time: 2018-11-15 15:43:26
 */

const fibonacci = (() => {
    const cached = {
        1: 1,
        2: 1,
        length: 2
    }
    return (n) => {
        if (cached[n]) return cached[n]

        for (let i = cached.length + 1; i <= n; i++, cached.length++) {
            cached[i] = cached[i - 1] + cached[i - 2]
        }

        return cached[n]
    }
})()

module.exports = fibonacci
