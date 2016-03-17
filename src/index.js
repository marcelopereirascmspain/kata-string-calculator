import { escapeRegex, isNotEmpty, parseIntBase10, isNotNaN } from './utils';

// add :: String -> Number
export default function add(input) {
  let delimiters = parseDelimiters(input);
  let numbers = parseNumbers(delimiters, input);

  return numbers.reduce(addNumbers, 0);
}

function parseDelimiters(input) {
  let defaultDelimiter = ',';
  let regex = /^\/\/(\[.+])\n/g;
  let matches = regex.exec(input);

  return matches ?
    matches[1].split(/[\[\]]/).filter(isNotEmpty) :
    [defaultDelimiter];
}

function parseNumbers(delimiters, str) {
  let d = delimiters.map(escapeRegex).join('|')
  let regex = new RegExp(`${d}|\n`);

  // should use a monad for this
  return str.split(regex)
    .map(ensurePositive)
    .map(parseIntBase10)
    .filter(isNotNaN)
    .filter(isLessThanAThousand);
}

function ensurePositive(n) {
  if (n < 0) {
    throw new Error('Negatives not allowed. ' + n);
  }

  return n;
}

let isLessThanAThousand = n => n < 1000;
let addNumbers = (a, b) => a + b;