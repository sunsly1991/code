
// bag的承重
const W = Math.floor(Math.random() * 100)
const goods = [
    {
        value: Math.floor(Math.random() * 100),
        weight: Math.floor(Math.random() * W),
    },
    {
        value: Math.floor(Math.random() * 100),
        weight: Math.floor(Math.random() * W),
    },
    {
        value: Math.floor(Math.random() * 100),
        weight: Math.floor(Math.random() * W),
    },
    {
        value: Math.floor(Math.random() * 100),
        weight: Math.floor(Math.random() * W),
    },
    {
        value: Math.floor(Math.random() * 100),
        weight: Math.floor(Math.random() * W),
    },
]

/**
 * 用承重是Weight的包，来装goods列表里的商品，得出价值最高的方案
 * @param {array} goods 商品列表
 * @param {int} Weight 包承重
 */
function fn (goods, Weight) {
    // 用来存一堆子问题的结果
    const cache = []
    // cache[前i个物品][包的重量是w] = {
    //     value: 物品的最高价值
    //     weight: 物品的总重
    //     indexs: 物品的index们
    // }

    // 构建一个子问题集的过程，用来缓存结果，并最终得到总的结果
    // i表示前i个物品
    for (let i = 0; i <= goods.length; i++) {
        cache[i] = []
        // w表示包的承重是多少
        for (let w = 0; w <= Weight; w++) {
            // 没有物品，价值为0
            // 包的总承重是0，价值是0
            if (i === 0 || w === 0) {
                cache[i][w] = {
                    value: 0,
                    weight: 0,
                    indexs: []
                }
                continue
            }

            let good = goods[i - 1]
            // 物品重量超过当前包的重量，用前一个物品的最优解
            if (good.weight > w) {
                cache[i][w] = cache[i - 1][w]
                continue
            }

            // 当前物品是否放入包的判断条件
            if (good.value + cache[i - 1][w - good.weight].value > cache[i - 1][w].value) {
                cache[i][w] = {
                    value: good.value + cache[i - 1][w - good.weight].value,
                    weight: good.weight + cache[i - 1][w - good.weight].weight,
                    indexs: cache[i - 1][w - good.weight].indexs.concat([i - 1])
                }
            } else {
                cache[i][w] = cache[i - 1][w]
            }
        }
    }

    return cache[goods.length][Weight]
}
console.log('商品：\n', goods)
console.log('包承重：\n', W)
console.log('结果：\n', fn(goods, W))
