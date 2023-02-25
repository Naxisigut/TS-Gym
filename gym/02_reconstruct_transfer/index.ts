/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------------数组-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */

/* 给元组尾部增加一个类型 */
type getArrPush<T extends unknown[], ele> = [...T, ele]
type res044 = getArrPush<[1, 2], '3'>

/* 去除元组尾部的类型 */
type getArrPop<T extends unknown[]> = T extends [...infer arr, any] ? arr : []
type res045 = getArrPop<[1]>
type res046 = getArrPop<[]>

/* 元组头部增加一个类型 */
type getArrUnshift<T extends unknown[], first> = [first, ...T]
type res047 = getArrUnshift<[2, 3], 5>

/* zip 合并两个数组 */
type getTwoTwoZip<T extends [unknown, unknown], P extends [unknown, unknown]> = 
      T extends [infer T1, infer T2] ?
      P extends [infer P1, infer P2] ? 
      [[T1, P1], [T2, P2]] : never : never
type res048 = getTwoTwoZip<[1, 2], ['a', 'b']>

/* morezip 两个数组的元素不限制个数 */
type getMoreZip<T extends unknown[], P extends unknown[]> = 
      T extends [infer T1, ...infer Trest] ?
      P extends [infer P1, ...infer Prest] ?
      [[T1, P1], ...getMoreZip<Trest, Prest>] : [] : [] // 这里的两个空数组不能用never代替，因为[...never]为never
type res049 = getMoreZip<[1, 2, 3, 4], ['a', 'b', 'c', 'd']>
type test01 = [...never]




/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------------字符串-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 大写字符串首字母 */
type capitalize<T extends string> = T extends `${infer first}${infer rest}` ? `${Uppercase<first>}${rest}` : '' 
type res050 = capitalize<'test'>
type res051 = capitalize<''>

/* 驼峰 */
type camelize<T extends string> = T extends `${infer before}-${infer after}` ? `${before}${camelize<capitalize<after>>}` : T
type res052 = camelize<'app-vue'>
type res053 = camelize<'app-vue-react'>
type res054 = camelize<''>
type res055 = camelize<'app-'>

/* 删除某子串 */
type delSubStr<T extends string, sub extends string> = 
    T extends `${infer left}${sub}${infer right}` 
        ? `${left}${delSubStr<right, sub>}` 
        : T
type res056 = delSubStr<'aaaa', 'a'>
type res057 = delSubStr<'abaa', 'b'>
type res058 = delSubStr<'abaa', 'c'>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------------函数-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 增加参数 */
type appendParams<T extends Function, newParam> = 
    T extends (...args: infer args)=>infer ret 
        ? (...args: [...args, newParam])=>ret 
        : never
type res060 = appendParams<(name: string)=>boolean, number>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -------------------------------索引类型-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 修改对象值的类型 */
type mapping<T extends object> = {
    [key in keyof T] : [T[key], T[key]]
}
type res061 = mapping<{name: string, age: number}>

/* 修改key：capitalize key */
type capitalizeKey<T extends object> = {
    [key in keyof T as Uppercase<key & string>]: T[key] 
}
type res062 = capitalizeKey<{name: string, age: number}>

/* 内置高级类型Record */
type myRecord< T extends string | number | symbol, p> = {
  [key in T]: p
}
type diff01 = Record< 'name' | 'age', boolean>
type diff02 = myRecord< 'name' | 'age', boolean>
type res063 = Record<keyof {name: string, age: number}, boolean>
type res064 = Record<string | symbol, boolean>

/* 所有键修改为只读 */
type toReadOnly<T extends object> = {
    readonly [key in keyof T]: T[key]
}
type res065 = toReadOnly<{name: string, number: number}>

/* 所有键修改为非只读 */
type toMutable<T extends object> = {
    -readonly [key in keyof T]: T[key]
}
type res066 = toMutable<res065>

/* 所有键修改为可选 */
type toPartial<T extends object> = {
    [key in keyof T]?: T[key]
}
type res067 = toPartial<{name: string, age: number}>

/* 所有键修改为非可选 */
type toRequire<T extends object> = {
    [key in keyof T ]-?: T[key]
}
type res068 = toRequire<res067>

/* 根据键值类型过滤索引类型的键，返回新的索引类型 */
type filterKey<T extends object, filter> = {
  [key in keyof T as T[key] extends filter ? key : never] : T[key] 
}
// never 是任何类型的子类型，所以这里可以使用never。使用never作为索引的键的类型时，这个键会被忽略
type res069 = filterKey<{name: string, age: number}, string>