/**
 * 
 * @param {Object} obj 
 * @param {string} key 
 * @param {any} val 
 * @param {boolean} enumerable //可枚举的
 */
export const def= function (obj,key,val,enumerable) {
    Object.defineProperty(obj,key,{
        value:val,
        enumerable:enumerable,
        writable:true,
        configurable:true
    })
};