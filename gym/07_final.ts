/* 从query字符串中提取query参数 */
type parseSingle<T extends string> = T extends `${infer param}=${infer value}` ? {
  [ K in param]: value 
} : {}

type splitToArr<T extends string, splitter extends string> =
  T extends `${infer first}${splitter}${infer rest}`
  ? [first, ...splitToArr<rest, splitter>] : [T]

type parseQuery<T extends string, splitter extends string> = 
  T extends `${infer first}${splitter}${infer rest}`
  ? mergeObj<parseSingle<first>, parseQuery<rest, splitter>> : parseSingle<T>

type mergeObj<T extends Object, P extends Object> = {
  [K in keyof T | keyof P]: 
    K extends keyof T ? 
      K extends keyof P ? 
        [T[K], P[K]] : 
        T[K] :
    K extends keyof P ? P[K] : never
}

type res155 = parseQuery<'a=5&b=6&c=7&d=8&d=9', '&'>




/* answer */
type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
  ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
  : ParseParam<Str>;

type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}`
  ? {
    [K in Key]: Value
  } : {};

type MergeParams<
  OneParam extends Record<string, any>,
  OtherParam extends Record<string, any>
> = {
    [Key in keyof OneParam | keyof OtherParam]:
    Key extends keyof OneParam
    ? Key extends keyof OtherParam
    ? MergeValues<OneParam[Key], OtherParam[Key]>
    : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never
  }


type MergeValues<One, Other> =
  One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type res156 = ParseQueryString<'a=5&b=6&c=7&d=8&d=9'>