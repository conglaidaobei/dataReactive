import Dep from "./Dep.js";

var uid =0;
export default class Watcher{
    constructor(target,expression,callback){    
        // 一进行new Watcher 对象后,就执行了 构造器里的这些所有动作.也就是读取了指定对象的值
        this.id =uid++
        this.target =target;
        this.getter = this.parsePath(expression);
        this.callback=callback
        this.value=this.get()
    }
    update(){
        console.log('update');
            this.run()
    }
    run(){
        console.log('run');
        this.getAndInvoke(this.callback);
    }
    getAndInvoke(cb){
       const value= this.get();
       if(value!==this.value||typeof value=='object'){
           
           const oldValue =this.value;
           this.value=value;
           cb.call(this.target,value,oldValue)
       }
    }
    get(){  
        //依赖收集阶段      //这里就是target变量的定义处.也是赋值处     .Dep对象是全局唯一的,在这里.判定Dep.target的布尔值就为真了
        Dep.target =this;
        const obj =this.target
        var value;
        try {
           value=  this.getter(obj) //读对象的值
        } finally{
            Dep.target=null
        }
        return value;
    }
    parsePath(str){             //闭包 柯里化函数 func(x)(y)...
        var segments = str.split('.');

        return (obj)=>{
            segments.forEach(element => {
                obj=obj[element]
                console.log('parsePath---'+element);
            });
            return obj;
        }
    }
}