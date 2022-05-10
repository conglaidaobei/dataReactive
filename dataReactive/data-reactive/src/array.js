

//  utils组元素数据的响应式:
// 重写数组的7个方法


import { def } from './utils.js'

const arrayPrototype = Array.prototype;
export const arrayMethods = Object.create(arrayPrototype);

const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
];

methodsNeedChange.forEach(methodName => {

    //备份原方法
    const original = arrayPrototype[methodName];
    //这里的第三个参数不能用箭头函数,会导致上下文问题
    def(arrayMethods, methodName, function () {
        //这个this是指调用该方法的实例对象,即数组对象arr
        const result = original.apply(this, arguments)
        //把类数组对象变为数组,从而在Observe中判断为数组,从而实现对元素的监视
        const args =[...arguments]

        //push , unshift,splice能增加新项,故也要变为observe
        const ob = this.__ob__;
        let inserted = [];  //保存新增的数组元素,用于设置响应式
        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = args;   //指def形参的第三个function的参数
                break;
            case 'splice':
                inserted = args.slice(2)   //slice(start,end,newvalue) 开始结束时全闭区间
                break;
        }
        //判断inserted是否为空,让新增的项也成为响应式
        if (inserted) {
            //  ob就是OBserve类的实例对象 
            ob.observeArray(inserted)
        }
        //对数组类型也进行 Dep响应式
        ob.dep.notify()
        console.log('~~~~~~~~~');
        return result;
    }, false)
});