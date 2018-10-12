import { get, set, reduce } from 'lodash';


const keys = obj => Object.keys(obj);


const entries = obj => Object.entries(obj);


const values = obj => Object.values(obj);


const seq = num => Array.from(Array(num), (nada, i) => i);


const last = arr => arr[len(arr) - 1];


const len = arr => arr.length;


const isOdd = n => !!(n & 1);


const isEven = n => !(n & 1);



// const patpArrToStr = p => {
//   return reduce(p, (acc, syl, i) => isEven(i)
//     ? i === 0
//       ? `~${acc}${syl}`
//         ? i === 16
//         : `${acc}^${syl}`
//       : `${acc}-${syl}`
//     : `${acc}${syl}`
//   , '');
// };


const patpStrToArr = p => p.replace(/[\^~-]/g,'').match(/.{1,3}/g);



export {
  keys,
  entries,
  values,
  seq,
  last,
  len,
  isOdd,
  isEven,
  patpStrToArr,
};
