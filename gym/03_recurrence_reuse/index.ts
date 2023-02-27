/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* --------------------------------Promise-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 提取深层Promise的返回值类型 */
type PPP = Promise<Promise<Promise<Record<string, any>>>>;
type getDeepProValType<T> = 
  T extends Promise<infer inner>
  ? inner extends Promise<any>
    ? getDeepProValType<inner>
    : inner
  : never
type res070 = getDeepProValType<PPP>

/* 简化提取深层Promise */
type getDeepProValTypeSimple<T extends Promise<any>> =
  T extends Promise<infer value> 
  ? getDeepProValType<value>
  : T 
type res071 = getDeepProValTypeSimple<PPP>


/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------数组--------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 翻转数组类型 */
type revertTwo<T extends Array<any>> = T extends [infer first , ...infer rest] ? [...rest, first] : T
type revertArr<T extends Array<any>> = T extends [infer first , ...infer rest] ? [...revertArr<rest>, first] : T
type res072 = revertTwo<[1, 2]>
type res073 = revertArr<[1, 2, 3]>

/* 查找数组中某类型是否存在 */
type isEqual<T, P> = T extends P ? P extends T ? true : false : false
type isEqual_2<T, P> = (T extends P ? true : false) & (P extends T ? true : false)
type includesType<T extends unknown[], P> = 
  T extends [infer first, ...infer rest] 
  ? isEqual<first, P> extends true 
    ? true 
    : includesType<rest, P> 
  : false
type res074 = includesType<[1, 2, 3, 4, 5], 6>
type res075 = includesType<[1, 2, 3, 4, 5], 3>
type res076 = includesType<[1], 3>
type res077 = includesType<[], 3>

/* 移除数组中某个元素类型(首个) */
type removeFromArr<T, P> = 
  T extends [infer first, ...infer rest]
  ? isEqual<first, P> extends true
    ? rest
    : [first, ...removeFromArr<rest, P>]
  : T
type res078 = removeFromArr<[1, 2, 3], 2>
type res079 = removeFromArr<[1], 3>
type res080 = removeFromArr<[], 3>
type res081 = removeFromArr<[1, 2, 3, 3], 3> // 没有把所有的3都删除

/* 移除数组中某个元素类型(所有) */
type removeAllFromArr<T, P> = 
  T extends [infer first, ...infer rest]
  ? isEqual<first, P> extends true
    ? [...removeAllFromArr<rest, P>]
    : [first, ...removeAllFromArr<rest, P>]
  : T
type res082 = removeAllFromArr<[1, 3, 3, 4], 3> 
type res083 = removeAllFromArr<[1], 3> 
type res084 = removeAllFromArr<[], 3> 

/* 创建指定数量的数组类型 */
type createArr<length extends number, T = unknown, retArr extends unknown[] = []> = 
  retArr['length'] extends length
  ? retArr
  : createArr<length, T, [...retArr, T]>
type res085 = createArr<2>
type res086 = createArr<0>


/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* --------------------------------字符串--------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 替换字符串中的所有子串 */
type replaceAllSubStr<T extends string, origin extends string, to extends string> = 
  T extends `${infer before}${origin}${infer behind}`
  ? replaceAllSubStr<`${before}${to}${behind}`, origin, to>
  : T
type res087 = replaceAllSubStr<'123445', '4', 'a'>

/* 提取字符串中的每个字符，组成字符串 */
type strToUnion<T extends string> = 
  T extends `${infer first}${infer rest}`
  ? first | strToUnion<rest>
  : never
type res088 = strToUnion<'123'>
type res089 = strToUnion<''>

/* 翻转字符串 */
type reverseStr<T extends string> = 
  T extends `${infer first}${infer rest}`
  ? `${reverseStr<rest>}${first}`
  : ''
type res090 = reverseStr<'123'>
type res091 = reverseStr<''>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------对象/索引类型------------------------------ */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 将索引类型的所有键改为只读（深度不确定） */
type deepToReadOnly<T extends object> = 
  T extends any // 此处是为了触发计算
  ? {
    readonly [k in keyof T]: T[k] extends object
    ? T[k] extends Function // 若是函数，则不再继续深入
      ? T[k]
      : deepToReadOnly<T[k]>
    : T[k]
  }
  : never
type res092 = deepToReadOnly<{
  main: { name: string },
  subs: { subName: string }[],
  action: ()=>boolean
}>
