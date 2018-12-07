const api = require('./mockServer')

;(function () {
    return api.getStudentsPromise().then((students) => {
        // 开始获取每个学生的平均成绩，并传递promise
        return students.map(s => {
            return {
                ...s,
                average: 0,
                averagePromise: getAverageScorePromise(s.id)
            }
        })
    }).then(r => {
        // 全部学生平均成绩获取完成后，将平均成绩赋值给每个学生
        const averagePromises = r.map(s => s.averagePromise)

        return Promise.all(averagePromises).then(averages => {
            for (let i = 0; i < averages.length; i++) {
                r[i].average = averages[i]
            }

            return r
        })
    }).then(r => {
        // 格式化返回数据
        return r.map(s => {
            return {
                id: s.id,
                name: s.name,
                average: s.average
            }
        })
    })
})().then(r => {
    // 调用函数，输出结果
    console.log(r)
})

/**
 * 获取学生的平均成绩
 * 1. 获取学生课程
 * 2. 全部获取完成后求平均值
 */
function getAverageScorePromise (studentId) {
    return api.getCoursesPromise(studentId).then(courses => {
        const scorePromises = courses.map(c => {
            return getScorePromise(studentId, c.id)
        })

        return Promise.all(scorePromises).then(scores => {
            return scores.reduce((preVal, score) => {
                return preVal + score
            }, 0) / scores.length
        })
    })
}

/**
 * 获取学生的课程成绩
 */
function getScorePromise (studentId, courseId) {
    return api.getEvaluationPromise(studentId, courseId).then(e => {
        return e.score
    })
}
