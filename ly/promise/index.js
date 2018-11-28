const sleep = require('../lib/sleep')
const urls = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const startTime = new Date().getTime()
function fetch (url) {
    return new Promise(async resolve => {
        const fetchStartTime = new Date().getTime()

        await sleep(Math.random() * 2000 + 1000)

        const fetchEndTime = new Date().getTime()
        console.log(`完成${url}: ${' '.repeat((fetchStartTime - startTime) / 500)}${'-'.repeat((fetchEndTime - fetchStartTime) / 500)}`)

        resolve(url)
    })
}

// 请求一个显示一个Promise
function serial () {
    console.log('请求成功一个显示一个')

    // let promises = Promise.resolve()
    // for (let i in urls) {
    //     const url = urls[i]
    //     promises = promises.then(() => {
    //         return fetch(url)
    //     }).then(r => {
    //         console.log(`完成${url}: ${'-'.repeat((new Date().getTime() - startTime) / 1000)}`)
    //     })
    // }

    urls.reduce((promise, url) => {
        return promise.then(() => {
            return fetch(url)
        }).then(result => {
            console.log('显示', result)
        })
    }, Promise.resolve())
}
// serial()

// 请求一个显示一个async/await
async function serialAsync () {
    console.log('请求成功一个显示一个async/await')
    for (let i in urls) {
        const url = urls[i]
        const result = await fetch(url)
        console.log('显示', result)
    }
}
// serialAsync()

// 全部请求，一起显示
function parallel () {
    console.log('全部获取，然后显示')
    const getPromises = urls.map((url) => fetch(url))

    Promise.all(getPromises).then(results => {
        console.log('显示', results)
    })
}
// parallel()

function parallelFast () {
    console.log('全部获取，尽早顺序显示')

    const getPromises = urls.map((url) => fetch(url))

    getPromises.reduce((sequence, getPromise) => {
        return sequence.then(() => getPromise).then((result) => {
            console.log('显示', result)
        })
    }, Promise.resolve())
}
parallelFast()
