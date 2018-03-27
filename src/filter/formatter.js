export function timeFormatter (value) {
  if (!value) return '';
  value = value.toString().trim();
  if (value.length === 8) {
    return value.substr(0, 4) + '.' + value.substr(4, 2) + '.' + value.substr(6, 2);
  }
  return value;
}

export function addBrackets (value) {
  return '(' + value + ')';
}

export function addBraces (value) {
  return '{' + value + '}';
}

export function wrapped (value, NoOfWords) {
  if (value.length > NoOfWords) {
    return value.substr(0, NoOfWords) + '...';
  }
  return value;
}

export function str2Num (value) {
  let convertVal = parseInt(value);
  return isNaN(convertVal) ? value : convertVal;
}

export function convert2Str (value) {
  return value.toString();
}
