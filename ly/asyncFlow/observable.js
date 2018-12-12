const api = require('./mockServer')
const Rx = require('rxjs')

;(function (cb) {
    /**
     * 获取所有学生平均成绩
     * 1. 获取学生列表
     * 2. 对每个学生执行获取平均成绩
     * 3. 所有成绩回去完成后执行回调
     */
    api.getStudents(students => {
        const studentsOb = Rx.Observable.create(observer => {
            // 通过对比完成数量和学生总数量
            // 来确定是否所有学生平均成绩已获取完成
            let finishCount = 0
            students.forEach((s, i) => {
                getAverage(s.id, average => {
                    observer.next({
                        id: s.id,
                        name: s.name,
                        average,
                    })

                    finishCount++
                    if (finishCount >= students.length) observer.complete()
                })
            })
        })
        const r = []
        studentsOb.subscribe({
            next: result => r.push(result),
            complete: () => cb(r)
        })
        // const r1 = []
        // studentsOb.subscribe({
        //     next: result => r1.push(result),
        //     complete: () => cb(r1)
        // })
    })

    function getAverage (studentId, cb) {
        api.getCourses(studentId, courses => {
            const coursesOb = Rx.Observable.create(observer => {
                let finishCount = 0
                courses.forEach(c => {
                    getEvaluation(studentId, c.id, e => {
                        observer.next(e.score)

                        finishCount++
                        if (finishCount >= courses.length) observer.complete()
                    })
                })
            })

            const scores = []
            coursesOb.subscribe({
                next: score => scores.push(score),
                complete: () => {
                    const average = scores.reduce((preVal, score) => {
                        return preVal + score
                    }, 0) / scores.length

                    cb(average)
                }
            })
        })
    }

    function getEvaluation (studentId, courseId, cb) {
        api.getEvaluation(studentId, courseId, e => {
            cb(e)
        })
    }
})(r => {
    // 调用函数，输出结果
    console.log(r)
})
