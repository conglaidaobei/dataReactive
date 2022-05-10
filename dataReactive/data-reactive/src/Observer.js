import { def } from './utils.js'
import defineReactive from './defineReactive.js'
import {arrayMethods} from './array.js'
import observe from './observe.js'
import Dep from './Dep.js'



export default class Observer {
    constructor(value) {
        //每个Observer实例成员都有一个Dep实例,绑定在__ob__上
        this.dep=new Dep();
        /* 构造函数中的 this ,是表示Observer实例对象,而不是Observer类 */
        def(value, '__ob__', this, false)
        if(Array.isArray(value)){
            /* 如果是数组,要让数组指向重定义的数组方法 */
            Object.setPrototypeOf(value,arrayMethods)
            this.observeArray(value)
        }else{

            this.walk(value)
        }
    }
    /* 遍历 */
    walk(value) {
        for (const k in value) {
            defineReactive(value, k)
        }
    }
    //数组的特殊遍历
    observeArray(arr){
        for(let i =0,l=arr.length;i<l;i++){
            //逐项遍历
            observe(arr[i])
        }
    }
   

}

