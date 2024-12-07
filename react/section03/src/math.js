// math 모듈
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

export default function multiply(a, b) {
  return a * b;
}

// Common JS
// module.exports = {
//     add,
//     sub,
// }

// ESM
export { add, sub };


/**
 * 위처럼 안쓰고 이렇게 써도 가능
 * export function add(a, b) {
  return a + b;
}
 * 
 * function sub(a, b) {
  return a - b;
}
 * 
 */