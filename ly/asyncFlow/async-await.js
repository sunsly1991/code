const api = require('./mockServer')

;(async () => {
    const students = await api.getStudentsPromise()

    const averagePromises = students.map(async s => {
        return getAveragePromise(s.id)
    })

    const averages = await Promise.all(averagePromises)

    return students.map((s, i) => {
        return {
            id: s.id,
            name: s.name,
            average: averages[i]
        }
    })
})().then(r => {
    console.log(r)
})

async function getAveragePromise (studentId) {
    const courses = await api.getCoursesPromise(studentId)

    const evaluationPromises = courses.map(async c => {
        return api.getEvaluationPromise(studentId, c.id)
    })

    const evaluations = await Promise.all(evaluationPromises)

    const average = evaluations.reduce((preVal, evaluation) => {
        return preVal + evaluation.score
    }, 0) / evaluations.length

    return Promise.resolve(average)
}
