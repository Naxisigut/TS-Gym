/* 加 */
type add<num1 extends number, num2 extends number> = [...createArr<num1>, ...createArr<num2>]['length'] 
type res093 = add<2, 4>

/* 减 */
type substract<num1 extends number, num2 extends number> = 
  createArr<num1> extends [...createArr<num2>, ...infer rest] ? rest['length'] : never
type res094 = substract<5, 1>

/* 乘 */
type multiply<num1 extends number, num2 extends number, result extends unknown[] = []> = 
  num1 extends 0 ? result['length'] : multiply<substract<num1, 1>, num2, [...createArr<num2>, ...result]>
type res095 = multiply<3, 5>

/* 除 */
type divide<num1 extends number, num2 extends number, result extends unknown[] = []> = 
  num1 extends 0 ? result['length'] : divide<substract<num1, num2>, num2, [...result, unknown]>
type res096 = divide<15, 5>

/* 求字符串长度 */
type getStrLength<str extends string, result extends unknown[] = []> = 
  str extends '' 
  ? result['length'] 
  : str extends `${string}${infer rest}`
   ? getStrLength<rest, [...result, unknown]>
   : never
type getStrLength_2<str extends string, result extends unknown[] = []> = 
  str extends `${string}${infer rest}`
  ? getStrLength<rest, [...result, unknown]>
  : result['length']
type res097 = getStrLength<'ffff'>
type res098 = getStrLength<''>
type res099 = getStrLength<'fff'>
type res100 = getStrLength<''>

/* 两数比较 */
type isBigger<num1 extends number, num2 extends number, countArr extends unknown[] = []> =
  num1 extends num2 
  ? false // 相等
  : countArr['length'] extends num1
    ? false // num1较小
    : countArr['length'] extends num2
      ? true // num1较大
      : isBigger<num1, num2, [...countArr, unknown]>
type res101 = isBigger<3, 6>
type res102 = isBigger<3, 2>
type res103 = isBigger<3, 3>

/* 获取斐波那契的第n项 */
type fibonacciLoop<preArr extends unknown[], currArr extends unknown[], indexArr extends unknown[] = [], num extends number = 1> =
  indexArr['length'] extends num
  ? currArr['length']
  : fibonacciLoop<currArr, [...preArr, ...currArr], [...indexArr, unknown], num>
type getFibonacciN<n extends number> = fibonacciLoop<[1], [], [], n>
type res104 = getFibonacciN<8>
type res105 = getFibonacciN<0>

// <[1], [], []>
// <[], [1], [unknown]>
// <[1], [1], [unknown, unknown]>
// <[1], [1, 1], [unknown, unknown, unknown]>
// <[1, 1], [1, 1, 1], [unknown, unknown, unknown, unknown]>
// <[1, 1, 1], [1, 1, 1, 1, 1], [unknown, unknown, unknown, unknown, unknown]>
// <[1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [unknown, unknown, unknown, unknown, unknown, unknown]>