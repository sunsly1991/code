function getNum () {
    return parseInt(Math.random() * 1000000000)
}

let data = []
for (let i = 0; i < 1000; i++) {
    data.push(getNum())
}

module.exports = {
    data: data,
    result: [].concat(data).sort((a, b) => a - b)
}
