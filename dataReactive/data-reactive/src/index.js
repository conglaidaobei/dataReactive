
import observe from './observe.js'
import Watcher from './Watcher.js'



/*
    Observer:
       将一个正常的object转换为每个层级的属性都是 响应式(可被侦测)的
*/

var obj =
{
    a: {
        b: {
            n: 5
        }
    },
    b:[1,2,3,4]
}




observe(obj)

new Watcher(obj,'a.b.n',(val)=>{
    console.log('********',val);
})
obj.a.b.n=99
// console.log(obj);
//对于数组.只有调用7个方法中的方法时,才会触发 console.log('~~~~~~~~~'); 
