const Mock = require('mockjs')
const Random = Mock.Random

function delayFn (fn) {
    setTimeout(() => {
        fn()
    }, Random.natural(60, 100))
}

const getStudents = function (cb) {
    const d = Mock.mock({
        'students|3-10': [{
            'id|+1': 1,
            'name': '@first'
        }]
    })
    delayFn(() => {
        cb(d.students)
    })
}
const getStudentsPromise = function () {
    return new Promise(resolve => {
        getStudents(resolve)
    })
}

const getCourses = function (studentId, cb) {
    const d = Mock.mock({
        'courses|3-5': [{
            studentId,
            'id': '@word'
        }]
    })
    delayFn(() => {
        cb(d.courses)
    })
}

const getEvaluation = function (studentId, courseId, cb) {
    const d = Mock.mock({
        evaluation: {
            studentId,
            courseId,
            'id|+1': 1,
            'score': '@natural(0, 100)',
            // 'totalScore|1': [100, 150],
        }
    })
    delayFn(() => {
        cb(d.evaluation)
    })
}

module.exports = {
    getStudents,
    getStudentsPromise,
    getCourses,
    getEvaluation,
}
