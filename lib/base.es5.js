function Base() {
    this.events = {};
}

Base.prototype.on = function(eventName, fn) {

    if (!Object.prototype.toString.call(fn) == '[object Function]') {
        throw new Error('绑定的事件类型不是函数')
    }
    (this.events[eventName] = this.events[eventName] || []).push(fn)
}

Base.prototype.trigger = function(eventName, value) {
    if (!this.events[eventName]) {
        return this;
    }
    var that = this
    this.events[eventName].forEach(function(fn) {
        fn.call(that, value)
    });
}
function merge() {
    var target = arguments[0] || {};
    var len = arguments.length;

    // 只传递一个参数
    if (len == 1) return target;

    for (var i = 1; i < len; i++) {
        var nextObj = arguments[i];

        for (var k in nextObj) {  //浅拷贝
            target[k] = nextObj[k];
        }
    }
    return target;
}

Base.extend = function (prototype, static) {
    var Super = this;

    function S() { }
    S.prototype = Super.prototype

    function Klass() {
        Super.call(this)
    }
    Klass.prototype = merge(new S, prototype)
    return merge(merge(Klass, Base), static);
}
 

module.exports = Base