/* 提取Promise的value的类型 */
type PromiseValue<T> = T extends Promise<infer value> ? value : never 
type p = Promise<111>
type res01 = PromiseValue<p>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------------数组-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */

/* 提取首元素类型 */
type getArrFirst<T> = T extends [infer first, ...unknown[]] ? first : never
type res02 = getArrFirst<[1, 2, 3]>
type res03 = getArrFirst<[]>
type res04 = getArrFirst<1>

/* 提取末元素类型 */
type getArrLast<T> = T extends [...unknown[], infer last] ? last : never
type res05 = getArrLast<[1, 2, 3]>
type res06 = getArrLast<[]>
type res07 = getArrLast<1>

/* 获得除末元素外的数组类型 */
type popArrLast<T> = T extends [] ? [] : T extends [...infer arr, unknown] ? arr : never
type res08 = popArrLast<[1, 2, 3]>
type res09 = popArrLast<[]>
type res10 = popArrLast<1>

/* 获得除首元素外的数组类型 */
type shiftArrFirst<T> = T extends [] ? [] : T extends [unknown, ...infer arr] ? arr : never
type res11 = shiftArrFirst<[1, 2, 3]>
type res12 = shiftArrFirst<[]>
type res13 = shiftArrFirst<1>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* ---------------------------------字符串-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */

/* 判断是否以某字符串开头 */
type isStartWith<T extends string, Pre extends string> = T extends `${Pre}${string}` ? true : false
type res14 = isStartWith<'123', '12'>
type res15 = isStartWith<'', '12'>
type res16 = isStartWith<'', ''>

/* 替换首个匹配字符串后的类型 */
type replaceStr<T extends string, Matcher extends string, Replacer extends string> =
    T extends `${infer prefix}${Matcher}${infer suffix}`
    ? `${prefix}${Replacer}${suffix}`
    : T
type res17 = replaceStr<'12323', '2', '4'>
type res18 = replaceStr<'', '12', '2'>
type res19 = replaceStr<'123', '', '6'>

/* 替换所有匹配字符串后的类型 */
type replaceStrAll<T extends string, Matcher extends string, Replacer extends string> =
    T extends `${infer prefix}${Matcher}${infer suffix}`
    ? replaceStrAll<`${prefix}${Replacer}${suffix}`, Matcher, Replacer>
    : T
type res20 = replaceStrAll<'123232323', '2', '4'>
type res21 = replaceStrAll<'', '12', '2'>
// type res22 = replaceStrAll<'123', '', '6'> // 可能无限递归

/* 去除字符串前后所有的空格后的类型 */
type trimLeft<T extends string> = T extends `${' '}${infer right}` ? trimLeft<right> : T
type trimRight<T extends string> = T extends `${infer left}${' '}` ? trimRight<left> : T
type trim<T extends string> = trimLeft<trimRight<T>>
type res23 = trim<'    t    '>
type res24 = trim<'  '>
type res25 = trim<''>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* ---------------------------------函数---------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */

/* 提取函数的参数数组类型 */
type getParams<T extends Function> = T extends (...args: infer args) => any ? args : never
type res26 = getParams<(a: string, b: number, c: undefined)=>boolean>
type res27 = getParams<()=>boolean>

/* 提取函数的返回值类型 */
type getRet<T extends Function> = T extends (...args: any[])=> infer ret ? ret : void // 此处any不能使用unknown代替，涉及到参数的逆变
type res28 = getRet<(a: string, b: number, c: undefined)=>boolean>
type res29 = getRet<()=>void>

/* 提取函数的this类型 */
type getThis<T extends Function> = T extends (this: infer This, ...args: any[])=> any ? This : unknown
class testThis {
    name: string;
    constructor(name: string){
        this.name = name
    }
    hello(this: testThis){ // 在此处需指明此函数的this的类型
        console.log(this.name)
    }
}
const testThisClass = new testThis('lcc')
type res30 = getThis<(a: string, b: number, c: undefined)=>boolean> // 对于正常未指定this的函数，this类型为unknown
type res31 = getThis<()=>void>
// type res32 = getThis<testThisClass.hello> // 不能这样写，因为这里传入的是一个函数，而不是一个函数类型
type res32 = getThis<typeof testThisClass.hello> 



/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -------------------------------构造器---------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */

/* 构造器本质上就是一个函数，但是通常用来创建对象，一般使用new语法。 */
/* 构造器可以使用interface声明 */
interface man {
    name: string
}
interface newMan {
    new(name: string): man // 构造器
}
/* 获取构造器实例类型 */
type getConstructorInstance<T>
    = T extends new (...args: any) => infer instance // 构造器仅仅是在普通函数的前面增加了new
    ? instance
    : undefined
type res33 = getConstructorInstance<newMan>
type res34 = getConstructorInstance<()=>boolean> // 虽然在js中，任何函数都可以使用new语法，但在ts中普通函数是无法满足约束extends new的

/* 构造器ps */
// function testConstructor(){
//     return false
// }
// const r = new testConstructor() //这样的代码在js中是合法的，r为一个空对象

/* 获取构造器参数类型 */
type getConstructorParams<T> = T extends new (...args: infer params)=>any ? params : never
type res35 = getConstructorParams<newMan>
type res36 = getConstructorParams<()=>boolean>


/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -------------------------------索引类型-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */

interface indexType{
    name: string,
    age: number,
    isHealthy: boolean
}
interface indexType2{
    age: number,
    isHealthy: boolean
}
/* 获取索引类型所有的key的字面量组成的联合类型 */
type getKeysType<T> = keyof T
type res37 = getKeysType<indexType> // 'name' | 'age' | 'isHealthy'  

/* 获取索引类型所有的key的类型组成的联合类型 */
/**
 * 说明：
 * 联合类型具有分布式的特点，所以 indexType['name' | 'age' | 'isHealthy']
 * = indexType['name'] | indexType['age'] | indexType['isHealthy']
 * = string | number | boolean
 */
type getValuesType<T> = T[keyof T]
type res38 = getValuesType<indexType>

/* 获取索引类型某个key的值的类型 */
type getNameType<T extends object> = 'name' extends keyof T ? T['name'] : never
type getAgeType<T> = T extends { age?: infer ageType | undefined } ? ageType : never
type res39 = getNameType<indexType>
type res40 = getNameType<indexType2>
type res41 = getNameType<{ age?: number }>
type res42 = getAgeType<indexType>
type res43 = getAgeType<{ name: string}>
