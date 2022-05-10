import observe from './observe.js'
import Dep from './Dep.js'

/**
 * 闭包.参数 val  的存在,defineReactive方法对set,get方法形成闭包
 * 详情见 readme.md文档
 */
export default function defineReactive(data, key, val) {
    //dep和val成为了 defineReactive 对 get/set方法形成闭包的媒介
    const dep = new Dep()   
    if (arguments.length == 2) {
        val = data[key]
    }
    /*  这句就是循环来逐层设置响应式的关键observ->Observer->defineReactive:对对象的每个子元素进行observe */
   let childOb =observe(val)
    Object.defineProperty(data, key, {
        get() {
            console.log('试图访问' + key + '属性');
            //如果现在处于依赖的收集阶段
            if(Dep.target){
                dep.depend()
                if(childOb){    //子元素也depend
                    childOb.dep.depend()    //Dep:添加依赖
                }
            }
            return val
        },
        set(newVal) {
            console.log('试图改变' + key + '属性');
            if (val == newVal) return;

             val = newVal;
             /* 这里仍要observe,是因为可能新赋的值又是 对象类型 */
                childOb=observe(newVal)
            //发布订阅模式,通知dep
            console.log('set');
            dep.notify();       //Dep通知更新 
        }
    })
}