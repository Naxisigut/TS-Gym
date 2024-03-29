/* 内置高级类型 */

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* ---------------------------------索引类型------------------------------ */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* Record */
type res157 = Record<'name' | 'age' | 'gender', string>

/* Pick */
type res158 = Pick<{name: string, age: number, gender: string}, 'name' | 'age'>

/* Omit */
type res159 = Omit<{name: string, age: number, gender: string}, 'name' | 'age'>


/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* ---------------------------------联合类型------------------------------ */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* Exclude */
type res160 = Exclude<'name' | 'age' | 'gender', 'gender'>

/* Extract */
type res161 = Extract<'name' | 'age' | 'gender', 'gender'>


/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------------函数-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* Parameters */
type res162 = Parameters<(name: string, age: number)=>any>

/* ReturnType */
type res163 = ReturnType<(name: string, age: number)=>boolean>

/* ConstructorParameters */
type res164 = ConstructorParameters<newMan>

/* InstanceType */
type res165 = InstanceType<newMan>

/* ThisParameterType */
// type res166 = ThisParameterType<>

/* OmitThisParameter */
// type res167 = OmitThisParameter<>

/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* -----------------------------------其它-------------------------------- */
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */
/* Awaited */
const test03 = new Promise((resolve, reject)=>{
  const value01 = 'value01'
  resolve(value01)
}).then((res)=>{
  const value02 = 'value02'
  return value02
}).then((res)=>{
  const value03 = 'value03'
  return value03
})
type res168 = typeof test03
type res169 = Awaited<typeof test03>

/* NonNullable */
type res170 = NonNullable<undefined>
type res171 = NonNullable<null>
type res172 = NonNullable<'name'>