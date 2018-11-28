(() => {
    const bindViewToData = (el, data) => {
        for (let prop in data) {
            defineReactive(data, prop)
        }

        DOMComb(el, function () {
            // nodeType === 3 为Text Node
            if (
                this.nodeType === 3 &&
                this.nodeValue &&
                this.nodeValue.match(/\{\{.*\}\}/)
            ) {
                const node = new Node(this, data)

                node.bind()
                console.log(node.deps)
            }
        })
    }

    /* Node dom节点的包装，可以直接触发用数据重新渲染该节点 */
    function Node (node, data) {
        this.data = data
        // DOM Node
        this.Node = node
        // 原始模板
        this.nodeTmpl = node.nodeValue
        // 依赖的数据
        this.deps = []
    }
    Node.prototype = {
        // 绑定数据，并使用数据渲染页面
        bind: function () {
            // 设置target为当前节点
            pushTarget(this)
            this.render()
            // 取消设置当前节点为target
            popTarget()
        },
        update: debounce(function () {
            this.render()
        }, 400),
        render: function () {
            this.Node.nodeValue = this.nodeTmpl.replace(/\{\{(.*?)\}\}/g, (match, p1, offset, string) => {
                // console.log(match)
                // console.log(p1)
                // console.log(offset)
                // console.log(string)
                console.log(p1)
                return this.execute(p1)
            })
        },
        execute: function (exp) {
            return new Function(
                'data',
                `with(data) {
                    return ${exp}
                }`
            )(this.data)
        },
        addDep: function (dep) {
            if (this.deps.includes(dep)) return false

            return this.deps.push(dep)
        },
    }

    /**
     * observer 观察者
     * - 数据获取时，绑定对应关系
     * - 数据有变化，通知改变
     */
    function defineReactive (obj, key, val = null) {
        // 每个值，对应一个dep实例，用于记录依赖，通知更新
        const dep = new Dep(key)
        val = obj[key]

        Object.defineProperty(obj, key, {
            get: function () {
                if (Dep.target) {
                    // 建立数据和Node的依赖关系
                    dep.depend()
                }
                return val
            },
            set: function (_val) {
                if (val === _val) return false

                val = _val
                dep.notify()
            }
        })
    }
    function Dep (name) {
        // 记录下数据名字 - key
        this.name = name
        // 一个Node的数组
        this.subs = []
    }
    Dep.prototype = {
        // 将会指向一个Node
        // 同一时间只会有一个Node被用来计算依赖关系
        // 将会用在获取数据和Node的对应关系
        target: null,
        // 让当前指向的那个Node，依赖这个数据
        depend: function () {
            if (Dep.target && Dep.target.addDep(this)) {
                this.addSub(Dep.target)
            }
        },
        addSub: function (node) {
            if (this.subs.includes(node)) return false
            return this.subs.push(node)
        },
        notify: function () {
            this.subs.forEach(function (node) {
                node.update()
            })
        }
    }
    Dep.target = null
    const targetStack = []
    function pushTarget (_target) {
        if (Dep.target) targetStack.push(Dep.target)
        Dep.target = _target
    }
    function popTarget () {
        Dep.target = targetStack.pop()
    }

    /* utils */
    /**
     * 深度遍历所有DOM节点，并对每个节点执行回调
     */
    function DOMComb (oParent, oCallback) {
        if (oParent.hasChildNodes()) {
            for (var oNode = oParent.firstChild; oNode; oNode = oNode.nextSibling) {
                DOMComb(oNode, oCallback)
            }
        }
        oCallback.call(oParent)
    }
    /**
     * 防抖，合并多次操作，最终一次执行
     */
    function debounce (fn, ms) {
        'use strict'
        let timer

        return function () {
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
                fn.call(this, ...arguments)
            }, ms)
        }
    }

    window.bindViewToData = bindViewToData
})()
