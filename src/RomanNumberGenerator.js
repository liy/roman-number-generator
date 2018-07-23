const CONVERSION_TABLE = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
];

export default class RomanNumberGenerator
{
  constructor() {}

  generate(number) {
    // Edge cases
    if(number <= 0 || number > 3999) return null;

    // Not valid integer number: undefined, null, string, decimal number or other type of objects
    if(!Number.isInteger(number)) return null;

    let romanNumeral = '';

    // Basically, iteratively calulcate the largest factor(existed in the table) of the remain number.
    for(let [symbol, value] of CONVERSION_TABLE) {
      // Factor will be the number of corresponding roman numeral symbols
      let numSymbols = Math.floor(number / value);
      number -= numSymbols * value;

      // Concatenate the roman numeral symbols
      for(let i=0; i<numSymbols; ++i) {
        romanNumeral += symbol;
      }
    }

    return romanNumeral;
  }
}