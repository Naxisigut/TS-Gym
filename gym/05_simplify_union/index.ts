/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* --------------------------------联合类型-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* 单独大写联合类型中的a */
type upperCaseA<T extends string> = T extends 'a' ? Uppercase<T> : T
type res106 = upperCaseA<'a' | 'b' | 'c'>

/* 判断联合类型 */
/* 只有？左边的类型变量会触发分布式 */
/* 并且[T] [P]的写法并不会触发分布式 */
type isUnion2<T, P = T> = 
  T extends T 
  ? [P] extends [T]
    ? false
    : true
  : never
type res107 = isUnion2<1 | 2>
type res108 = isUnion2<1>
type TestUnion<A, B = A> = A  extends A ? { a: A, b: B} : never;
type res109 = TestUnion<'a' | 'b'>

/* 数组转联合 */
type arrToUnion<T extends Array<unknown>> = T[number] 
type res110 = arrToUnion<[1, 2, 3]>

/* BEM命名 */
type bem<block extends string, ele extends string[], modifier extends string[]> = `${block}__${ele[number]}--${modifier[number]}`
type res111 = bem<'zone', ['title', 'content'], ['isEditing', 'isSelected']>

/* 两两组合 */
type combine<T extends string, P extends string> = `${T | P}` | `${T}${P}` | `${P}${T}`
type res112 = combine<'a', 'b'>

/* 全组合 */
type allCombine<T extends string, P extends string = T> =
  T extends T 
  ? combine<T, allCombine< Exclude<P, T> >>
  : never
type res113 = allCombine<'a' | 'b' | 'c'>
 
/* 排除 */
// 若A是B的子类型，则返回never; 若不是，则返回A
// 利用union分布式的特性，可以排除union中的某些类型
// 即 排除A联合类型中的所有B类型（所有受B类型约束的子类型）
type exclude<A, B> = A extends B ? never : A
type res114 = exclude<'a', string>
type res115 = exclude<'a', 'a' | 'b'>
type res116 = exclude<'a' | 'b', 'a'>
type res117 = exclude<'a' | 'b' | 1, string>
type res118 = exclude<'a' | 'b' | 'c', 'a' | 'b'>



