import Observer from './Observer.js'

/* 创建observe函数  ,且只对 Object 类型有效 */
export default function observe(value)  {

    if (typeof value != 'object') return;
    //定义ob
    var ob;
    if (typeof value.__ob__ != 'undefined') {
        ob = value.__ob__;
    } else {
        ob = new Observer(value)
    }
    return ob;

};
