class Base {
    constructor() {    //constructor 构造方法
       this.events = {}
    }

    on (name, fn) {
        if (typeof name !== 'string'){
            throw new Error('事件名称类型必须为string');
        }
        if (Object.prototype.toString.call(fn) !== '[object Function]') {
            throw new Error('事件回到不正确');
        }
        this.events[name] = fn;
    }
    trigger(name, value) {
        if(typeof name == 'string'){
            throw new Error('事件名类型必须为string')
        }
        if(!this.events[name]){
            throw new Error(`${name} 事件不存在`)
        }
        let val = value || '';
        this.events[name].call(this, value);
    }

    
}
module.exports = Base