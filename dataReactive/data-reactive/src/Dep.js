var uid =0;
export default class Dep{
    constructor(){
        this.id =uid++
        //用数组存储自己的订阅者    subscribes
        //数组里放的是Watcher的实例
        this.subs=[]
    }
    //添加依赖
    depend(){
        //全局的位置.用Window.target也行
        if(Dep.target){     //被 defineReactive 的get方法调用后, 发现 判定为真 .将 用来监视而创建的这个Watcher实例存入.
            this.addSub(Dep.target) // 等待 这些保存下来的 Watcher 的数据被defineReactive 侦测到发生改变,会由其set方法调用这里的 notify ,来进行对应Watcher 监视的数据的更新
        }
    }
    //添加订阅
    addSub(sub){
        this.subs.push(sub)
    }


    //通知更新
    notify(){
        //浅拷贝一份
        console.log('notify1');
        const subs = this.subs.slice()
        for(let i =0,l=subs.length;i<l;i++){
            subs[i].update();   //Watcher的方法     Dep类和Watcher类没有关系 .而是靠 Dep的那个唯一实例对象的target上绑定的 Watcher实例对象的引用,来找到对应的对象的update方法
        }
    }
    
}