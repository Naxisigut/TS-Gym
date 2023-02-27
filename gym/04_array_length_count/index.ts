/* 加 */
type add<num1 extends number, num2 extends number> = [...createArr<num1>, ...createArr<num2>]['length'] 
type res093 = add<2, 4>

/* 减 */
type substract<num1 extends number, num2 extends number> = 