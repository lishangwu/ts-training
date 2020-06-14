// desc {
//     value: [Function (anonymous)],
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
function get(params:any){
    return function(target:any,methodName:any, desc:any){
        console.log('target',target)
        console.log('methodName',methodName)
        console.log('desc',desc)
        let oMethod = desc.value
        desc.value = function(...args:any[]){
            console.log('desc.value')
            args = args.map((value)=>{
                return String(value)
            })
            oMethod.apply(this, args)
        }
    }
}
function logParams(params:any){
    return function(target:any,methodName:any,paramsIndex:any){
        console.log(target)
        console.log(methodName)
        console.log(paramsIndex)
    }
}

//装饰器执行顺序：属性装饰器、方法装饰器、方法参数装饰器，
// 多个同样装饰器：先执行后面的
// @logClass('http://www.baidu.com')
class HttpClient{
    constructor(){

    }
    @get('http://www.baidu.com')
    getData(...args:any[]){
        console.log(args)
        console.log('i am getData')
    }
    getData2( @logParams('uuid') uuid:any ){

    }
}

let http = new HttpClient()

http.getData(1,2,3,'asd')