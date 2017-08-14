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

Base.extend = function() {
    var options = Array.prototype.slice.call(arguments);

    var O = function() {
        Base.call(this)
    };
    O.prototype = Base.prototype;

    for (var n = 0; n < options.length; n++) {
        var item = options[n] || {};
        for (var k in item) {
            O[k] = item;
        }

    }


    // var Child = function() {}
    // Child.prototype = Base.prototype;

    // for (var i = 0; i < options.length; i++) {
    //     for (var k in options[i]) {
    //         console.log(k, options[i][k]);
    //         Child.prototype[k] = options[i][k];
    //     }
    // }

    // console.log(Child.prototype.getVal);
    // return Child;
    return O;
}

var MyClass = Base.extend({
    getVal: function() {
        return 'hello world'
    }
}, {
    say: function(word) {
        return word
    }
})
console.log(MyClass);
var myclass = new MyClass
console.log(myclass);
console.log(myclass.getVal)
console.log(MyClass.say);

module.exports = Base