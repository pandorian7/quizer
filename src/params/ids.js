export function match(param) {
  let id = parseInt(param);
  return !isNaN(id) && id > 0;
}
