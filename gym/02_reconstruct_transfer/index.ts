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