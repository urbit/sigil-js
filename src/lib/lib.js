import { get, set, reduce } from 'lodash';


const keys = obj => Object.keys(obj);


const entries = obj => Object.entries(obj);


const values = obj => Object.values(obj);


// const includes = (arr, val) => arr.includes(val)


// const compose = (...fs) => fs.reduceRight((pF, nF) => (...args) => nF(pF(...args)), v => v)


// const remap = (n, iMax, iMin, oMax, oMin) => (n - iMin) * (oMax - oMin) / (iMax - iMin) + oMin



const isEven = n => n % 2 === 0;



const isOdd = n => n % 2 !== 0;



const patpArrToStr = p => {
  return reduce(p, (acc, syl, i) => isEven(i)
    ? i === 0
      ? `~${acc}${syl}`
        ? i === 16
        : `${acc}^${syl}`
      : `${acc}-${syl}`
    : `${acc}${syl}`
  , '');
};


const patpStrToArr = p => p.replace(/[\^~-]/g,'').match(/.{1,3}/g);



export {
  isEven,
  isOdd,
  values,
  entries,
  keys,
  patpStrToArr,
  remap,
};
