const api = require('./mockServer')

;(function (cb) {
    const r = {
        // 所有学生数据
        data: [],
        format: function () {
            return this.data.map((d) => {
                return {
                    id: d.id,
                    name: d.name,
                    average: d.average
                }
            })
        }
    }

    // 1. 获取学生列表
    api.getStudents((students) => {
        // 绑定所有学生流程完成之后的操作
        // students.length表示需要获取学生课程的次数
        // 也就是所有学生还需要执行异步的次数
        r.done = new CbFlowDone(students.length, function () {
            // 5. 每个学生成绩平均值计算完成后，执行最终回调，回传结果
            console.log('all students done')
            cb(this.format())
        }.bind(r))

        students.forEach(s => {
            // 每个学生的数据、方法
            const _s = {
                id: s.id,
                name: s.name,
                average: 0,
                courses: [],
                // 计算平均分
                calc: function () {
                    this.average = this.courses.reduce((d, c) => {
                        return d + c.score
                    }, 0) / this.courses.length
                }
            }
            // 按顺序压入每个学生数据
            // 并利用闭包、应用类型变量更新数据
            r.data.push(_s)

            // 2. 根据每个学生的id，获取该学生的课程列表
            api.getCourses(s.id, (courses) => {
                // 绑定每个学生流程完成之后的操作
                // courses.length表示还需要获取成绩的次数
                // 也就是当前学生还需要执行的异步操作的次数
                _s.done = new CbFlowDone(courses.length, function () {
                    // 4. 取得学生的每门课成绩后，计算平均值
                    this.calc()
                    console.log(`student ${s.id}:${s.name} done`)
                    console.log(this.courses)
                    console.log(this.average)

                    // 每个学生的异步完成后，检查所有学生异步是否全部完成
                    r.done.do().check()
                }.bind(_s))
                courses.forEach((c) => {
                    const _c = {
                        id: c.id,
                        studentId: c.studentId,
                    }
                    _s.courses.push(_c)

                    // 3. 根据学生id，和每个课程id，获取成绩
                    api.getEvaluation(s.id, c.id, (e) => {
                        _c.score = e.score

                        // 每次成绩获取完成后，检查该学生是否获取完全部成绩
                        _s.done.do().check()
                    })
                })
            })
        })
    })
})(r => {
    // 输出结果
    console.log(r)
})

;(function (cb) {
    const r = {
        // 所有学生数据
        data: [],
        format: function () {
            return this.data.map((d) => {
                return {
                    id: d.id,
                    name: d.name,
                    average: d.average
                }
            })
        }
    }

    api.getStudents(students => {
        r.done = new CbFlowDone(students.length, function () {
            cb(this.format())
        }.bind(r))

        students.forEach(s => {
            const _s = { ...s }
            r.data.push(_s)
            getAverage(s.id, (average) => {
                _s.average = average
                r.done.do().check()
            })
        })
    })

    function getAverage (studentId, cb) {
        const r = {
            average: 0,
            courses: [],
            calc: function () {
                this.average = this.courses.reduce((d, c) => {
                    return d + c.score
                }, 0) / this.courses.length

                return this.average
            }
        }
        api.getCourses(studentId, courses => {
            r.done = new CbFlowDone(courses.length, function () {
                // 求平均值
                cb(this.calc())
            }.bind(r))

            courses.forEach(c => {
                const _c = { ...c }
                r.courses.push(_c)

                getEvaluation(studentId, c.id, e => {
                    _c.score = e.score

                    r.done.do().check()
                })
            })
        })
    }

    function getEvaluation (studentId, courseId, cb) {
        api.getEvaluation(studentId, courseId, e => {
            cb(e.score)
        })
    }
})(r => {
    // 输出结果
    console.log('改造后')
    console.log(r)
})

// 对一组异步操作全部完成并执行统一回调的抽象
function CbFlowDone (flowCount, doneCb) {
    this.count = flowCount
    this.doneCount = 0
    this.done = false
    this.doneCb = doneCb
}
CbFlowDone.prototype = {
    // 用来检查是否完成这组操作
    // 如果已完成，执行回调
    check: function () {
        if (this.done) this.doneCb()

        return this
    },
    // 一组操作中，每次完成后执行的方法
    do: function (c = 1) {
        this.doneCount += c

        if (this.doneCount >= this.count) {
            this.done = true
        }

        return this
    }
}
