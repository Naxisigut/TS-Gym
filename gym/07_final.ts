/* 从query字符串中提取query参数 */
type strrr = 'a=5&b=6&c=7&d=8'
type getValue<T extends string> = T extends `${string}=${infer value}` ? value : never
type getParam<T extends string> = T extends `${infer param}=${string}` ? param : never

type splitToArr<T extends string, splitter extends string> = 
  T extends `${infer before}${splitter}${infer behind}` 
    ? [before, ...splitToArr<behind, splitter>] : [T]

    type strArr = splitToArr<strrr, '&'>
// type parseQuery<T extends string> = 
//  T extends `${infer before}&${infer behind}`
//   ? 

type mapToObj<T extends string[]> = {
  [key in keyof T as getParam<T[key] & string>] : getValue<T[key]>
}

type feaf = mapToObj<strArr>