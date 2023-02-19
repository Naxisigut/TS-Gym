/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------------数组-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */

/*  */
type getArrPush<T extends unknown[], ele> = [...T, ele]
type res044 = getArrPush<[1, 2], '3'>

/*  */
type getArrPop<T extends unknown[]> = T extends [...infer arr, any] ? arr : []
type res045 = getArrPop<[1]>
type res046 = getArrPop<[]>

/*  */
type getArrUnshift<T extends unknown[], first> = [first, ...T]
type res047 = getArrUnshift<[2, 3], 5>

/* zip */
// type getFirst<T extends unknown[]> = T extends [infer first, ...unknown[]] ? first : never
// type getLast<T extends unknown[]> = T extends [...unknown[], infer last] ? last : never
// type getArrZip<T extends unknown[], P extends unknown[]> = [[getFirst<T>, getFirst<P>], [getLast<T>, getLast<P>]]
type getTwoTwoZip<T extends [unknown, unknown], P extends [unknown, unknown]> = 
      T extends [infer T1, infer T2] ? P extends [infer P1, infer P2] ? [[T1, P1], [T2, P2]] : never : never
type res48 = getTwoTwoZip<[1, 2], ['a', 'b']>
type getMoreZip<T extends unknown[], P extends unknown[]> = 
      T extends [infer T1, ...infer Trest] ?
      P extends [infer P1, ...infer Prest] ?
      [[T1, P1], ...getMoreZip<Trest, Prest>] : [] : []
type res49 = getMoreZip<[1, 2], ['a', 'b']>
