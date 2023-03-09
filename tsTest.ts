// /* 联合转交叉 */
// // 分步完成
// type first<T> = T extends any ? (T extends T ? (x: T)=>unknown : never) : never
// // type second<T > = T extends (x: infer R)=>unknown ? R : never
// type second<T > = T extends any ? (T extends (x: infer R)=>unknown ? R : never) : never
// type firstRes = first<{name: string} | {age: number}>
// type secondRes = second<firstRes>

// type res = (x: string | number)=>unknown extends (x: infer R)=>unknown ? R : never

// // 一次性完成
// type UnionToIntersection<U> = 
//     (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
//         ? R
//         : never
// type oneStepRes = UnionToIntersection<{name: string} | {age: number}>



// 分步完成
// type getFirst<T> = T extends T ? (x: T)=>unknown : never
// type getSecond<T> = T extends (x: infer R)=>unknown ? R : never

// type get<T> = getSecond<getFirst<T>>
// type getStraight<T> = getFirst<T> extends (x: infer R)=>unknown ? R : never

// type straightRes = getStraight<{name: string} | {age: number}>
// type getRest = get<{name: string} | {age: number}>

type ee = ((x: 1)=>unknown) | ((x: 2)=>unknown) extends (x: infer R)=>unknown ? R : never // 没有触发
type eee = (((x: 1)=>unknown) extends ((x: infer R)=>unknown) ? R : never) | (((x: 2)=>unknown) extends ((x: infer R)=>unknown) ? R : never) // 触发了
// type ee3 = ((x: 1)=>unknown) | ((x: 2)=>unknown) extends (x: infer R)=>unknown ? R : never
// type e = (((x: 1)=>unknown) extends (x: infer R)=>unknown ? R : never) | (((x: 2)=>unknown) extends (x: infer R)=>unknown ? R : never)
type eeeee = 1 | 2 extends 2 ? true : false
type eeeeeee = (1 extends 2 ? true : false) | (2 extends 2 ? true : false)

// type s = getFirst<1 | 2>
// type ss = s extends (x: infer R)=>unknown ? R : never
// type sss = getSecond<s>
// type ssss = getSecond<((x: 1)=>unknown) | ((x: 2)=>unknown)>


type distribute<T> = T extends any ? T : never // 第一步触发分布式
type noDistribute<T> = T // 第一步没有触发分布式

type ttest1<T> = distribute<T> extends 2 ? T : never //  第二步没有触发分布式
type ttest2<T> = noDistribute<T> extends 2 ? T : never // 第二步触发了分布式

type ress1 = ttest1<1|2>
type ress2 = ttest2<1|2>

/* 猜测原因 */
// 1. 在进行类型运算时，ts会将在此过程中经过类型运算得到的高级类型 作为一个整体对待，此时即便该类型是联合类型，也不会触发分布式
// 2. 在运算过程中，会将已有的类型作为普通类型对待，此时若该类型是联合类型，则会触发分布式
// 3. 1中提到的类型运算，应为经过extends等运算符的运算。像noDistribute这种，其返回结果不会被作为整体对待。