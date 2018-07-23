import RomanNumberGenerator from "./RomanNumberGenerator";

let input = document.getElementById('input');
let output = document.getElementById('output');

let generator = new RomanNumberGenerator();

input.addEventListener('change', e => {
  let symbol = generator.generate(Number(input.value));
  if(symbol) {
    output.textContent = symbol;
  }
  else {
    output.textContent = 'Invalid input, must be a integer and between [1, 3999]';
  }
})