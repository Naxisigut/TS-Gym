/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------------Any---------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* Any的特性：
1. any是一种顶级类型，是任何类型的父类型，任何类型都可以满足any的约束。任何类型与any的联合类型为any 
2. 与正常逻辑相悖，any与除never外的任何类型的交叉类型为any
3. 不仅任意类型可以满足any的约束，any也可以满足任意类型的约束（不确切，应为any会跳过所有类型检查），所以当我们使用一个类型为any的变量时，TS不会做任何类型检查，可以把它传给任何函数。
4. 在条件类型中，若类型参数为any，会直接返回trueType和falseType的联合类型
*/
/* any与除never外的任何类型的交叉类型为any */
type res119 = 1 & any
type res120 = 1 | any
type res121 = never | any
type res122 = never & any

/* 条件类型中any类型会直接返回falseType | trueType */
type res125 = any extends 1 ? 2 : 3 // 因为any跳过了类型检查，所以这里返回了2和3的联合类型

/* any类型变量不会做检查 */
const testFunc001 = (name: string)=>{
  return true
}
const a: any = 1
testFunc001(a) // 因为a为any类型，所以即使这个函数要求参数类型为string，即使a实际为字面量类型1，但这里不会报错

/* 判断是否是Any */
type isAny<T> = 1 extends 2 & T ? true : false
type res123 = isAny<any>
type res124 = isAny<unknown>

/* 判断两个类型是否相同 */
type isEqualBug<T, P> = T extends P ? P extends T ? true : false : false
type res126 = isEqualBug<any, 'a'> // 由于any的特性，所以上面这种判断方法有漏洞

type isEqualBetter<T, P> = 
  isAny<T> extends false
  ? isAny<P> extends false 
    ? isEqualBug<T, P>
    : false
  : false
type res127 = isEqualBetter<1, 1>
type res128 = isEqualBetter<1, any>

type isEqualFinal<A, B> = (<T> () =>T extends A ? 1 : 2) extends (<T> ()=>T extends B ? 1 : 2) ? true : false
type res129 = isEqualFinal<1, 2>
type res130 = isEqualFinal<1, 1>
type res131 = isEqualFinal<1, any>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------Union-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 判断类型是否是联合类型 */
type isUnion<T, P=T> = T extends P ? [P] extends [T] ? false : true : never // 注意 [P]和[T]不能交换
type res132 = isUnion<1|2>

/* 联合类型在数组中 */
type res133 = [1] extends [1, 2] ? true : false
type res134 = [1] extends [1 | 2] ? true : false

/* 联合转交叉 */
// 分步完成
type first<T> = T extends T ? (x: T)=>unknown : never
type second<T> = T extends (x: infer R)=>unknown ? R : never
type firstRes = first<{name: string} | {age: number}>
type secondRes = second<firstRes>

type res = (x: string | number)=>unknown 

// 一次性完成
type UnionToIntersection<U> = 
    (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
        ? R
        : never
type oneStepRes = UnionToIntersection<{name: string} | {age: number}>
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------Never-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* never的特性：
1. never满足任何约束
2. never传入任何类型参数，且这个类型参数有参与运算，则直接返回never，即使它满足约束
*/
/* never满足任何约束 */
type res135 = never extends never ? true : false
type res136 = never extends 1 ? true : false

/* never传入任何类型参数，直接返回never */
type test02<T> = T extends never ? true : false
type res137 = test02<never> // 正常逻辑应返回true

/* 判断是否是never */
type isNever<T> = [T] extends [never] ? true : false
type res138 = isNever<never>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------tuple-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* tuple的特性：
1. tuple的length是数字字面量类型，数组的length是number类型
*/
/* 判断是否是元组 */
type isTuple<T> = T extends unknown[] ? number extends T['length'] ? false : true : false
type res139 = isTuple<[1, 2]>
type res140 = isTuple<string[]>
type res141 = isTuple<2>

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true;
type isTuple2<T> = T extends [...infer eles] ? NotEqual<eles['length'], number> : false 
type res142 = isTuple2<[1, 2]>
type res143 = isTuple2<string[]>
type res144 = isTuple2<2>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* --------------------------------可选索引-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 可选索引的特性：
1. 
*/
/* 提取索引类型中的可选属性 */

