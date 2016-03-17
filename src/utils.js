import { complement, partialRight } from 'ramda';
import { Success, Failure } from 'data.validation';

export function parseIntBase10(n) {
  return partialRight(parseInt, [10])(n);
}

export function isNotEmpty(str) {
  return str !== '';
}

export let isNotNaN = complement(isNaN);

export function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export function pos(n) {
  if (n < 0) {
    return Failure(['Negatives not allowed. ' + n]);
  }

  return Success(n);
}
