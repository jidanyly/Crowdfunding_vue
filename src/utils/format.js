const BN = require('bn.js');
import Decimal from 'decimal.js'

export function parseAmount(amount = "1", decimal = 18) {
  if (!amount) return "0"

  amount = cleanupAmount(amount);

  const split = amount.split('.');
  const wholePart = split[0];
  const fracPart = split[1] || '';
  if (split.length > 2 || fracPart.length > decimal) {
    throw new Error(`Cannot parse '${amount}' as bignumber`);
  }
  return trimLeadingZeroes(wholePart + fracPart.padEnd(decimal, '0'));
}
export function formatAmount(balance, decimal = 18) {
  const balanceBN = new BN(balance, 10);
  balance = balanceBN.toString();
  const wholeStr = balance.substring(0, balance.length - decimal) || '0';
  const fractionStr = balance.substring(balance.length - decimal)
    .padStart(decimal, '0').substring(0, decimal);

  return trimTrailingZeroes(`${wholeStr}.${fractionStr}`);
}
/**
 * Removes commas from the input
 * @param amount A value or amount that may contain commas
 * @returns string The cleaned value
 */
export function cleanupAmount(amount) {
  return amount.replace(/,/g, '').trim();
}
/**
 * Removes .000… from an input
 * @param value A value that may contain trailing zeroes in the decimals place
 * @returns string The value without the trailing zeros
 */
export function trimTrailingZeroes(value) {
  return value.replace(/\.?0*$/, '');
}
/**
 * Removes leading zeroes from an input
 * @param value A value that may contain leading zeroes
 * @returns string The value without the leading zeroes
 */
export function trimLeadingZeroes(value) {
  value = value.replace(/^0+/, '');
  if (value === '') {
    return '0';
  }
  return value;
}
/**
 * Returns a human-readable value with commas
 * @param value A value that may not contain commas
 * @returns string A value with commas
 */
export function formatWithCommas(value) {
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(value)) {
    value = value.replace(pattern, '$1,$2');
  }
  return value;
}

export function toFixed (number, pp) {
  let num = isNaN(number) || !number ? 0 : number
  let p = isNaN(pp) || !pp ? 0 : pp
  num = getFullNum(num)
  var n = (num + '').split('.') // eslint-disable-line
  var x = n.length > 1 ? n[1] : '' // eslint-disable-line
  if (x.length > p) {
    // eslint-disable-line
    x = x.substr(0, p) // eslint-disable-line
  } else {
    // eslint-disable-line
    x += Array(p - x.length + 1).join('0') // eslint-disable-line
  } // eslint-disable-line
  return n[0] + (x == '' ? '' : '.' + x) // eslint-disable-line
}
export function accMul (arg1, arg2) {
  if (!arg1 || !arg2) {
    return 0
  }
  const num = new Decimal(arg1).mul(new Decimal(arg2))
  // const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/); // eslint-disable-line
  // const kx = num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  return num.toFixed()
}

// 科学计数法转数值 - 处理 1e-7 这类精度问题
export function getFullNum (num) {
  // 处理非数字
  if (isNaN(num)) {
    return num
  }
  // 处理不需要转换的数字
  const str = String(num)
  if (!/e/i.test(str)) {
    return num
  }
  return Number(num)
    .toFixed(18)
    .replace(/\.?0+$/, '')
}

export function accDiv (arg1, arg2) {
  if (!arg1 || !arg2) {
    return 0
  }
  const num = new Decimal(arg1).div(new Decimal(arg2))
  // const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/); // eslint-disable-line
  // const kx = num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  return num.toFixed()
}

export function accAdd (arg1, arg2) {
  const num = Decimal(arg1).add(new Decimal(arg2))
  // const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/); // eslint-disable-line
  // const kx = num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  return num.toFixed()
}
export function accSub (arg1, arg2) {
  const num = new Decimal(arg1).sub(new Decimal(arg2))
  // const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/); // eslint-disable-line
  // const kx = num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  return num.toFixed()
}