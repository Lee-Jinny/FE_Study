// const moduleData = require("./math")

// 구조 분해 할당
// const { add, sub } = require("./math")


// ES Module 시스템은 확장자 꼭 적어야 함
// default 는 따로 
// import multiply from './math.js';
// import {add, sub} from "./math.js"
// 동일한 확장자 명은 같이적기 가능
// import multiply, {add, sub} from "./math.js"

// console.log(add(1,2));
// console.log(sub(1,2));
// console.log(multiply(1,2));

import randomColor from 'randomcolor';

const color = randomColor()
console.log(color);
