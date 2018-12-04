const api = require('./mockServer')

;(function (cb) {
    const r = {
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

    // 获取学生们
    api.getStudents((students) => {
        r.done = new CbFlowDone(students.length, function () {
            console.log('all students done')
            cb(this.format())
        }.bind(r))

        students.forEach(s => {
            // 构建每个学生的数据、方法
            const _s = {
                id: s.id,
                name: s.name,
                average: 0,
                // 计算平均分
                calc: function () {
                    this.average = this.courses.reduce((d, c) => {
                        return d + c.score
                    }, 0) / this.courses.length
                }
            }
            r.data.push(_s)

            // 通过学生id获取上的课程们
            api.getCourses(s.id, (courses) => {
                // 绑定每个学生流程完成之后的操作
                _s.done = new CbFlowDone(courses.length, function () {
                    // 计算平均分
                    this.calc()
                    console.log(`student ${s.id}:${s.name} done`)
                    console.log(this.courses)
                    console.log(this.average)

                    r.done.do().check()
                }.bind(_s))
                _s.courses = []
                courses.forEach((c) => {
                    const _c = {
                        id: c.id,
                        studentId: c.studentId,
                    }
                    _s.courses.push(_c)

                    // 通过学生id、课程id获取成绩
                    api.getEvaluation(s.id, c.id, (e) => {
                        _c.score = e.score

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

// 对一组异步操作全部完成并执行统一回调的抽象
function CbFlowDone (flowCount, doneCb) {
    this.count = flowCount
    this.doneCount = 0
    this.done = false
    this.doneCb = doneCb
}
CbFlowDone.prototype = {
    check: function () {
        if (this.done) this.doneCb()

        return this
    },
    do: function (c = 1) {
        this.doneCount += c

        if (this.doneCount >= this.count) {
            this.done = true
        }

        return this
    }
}
