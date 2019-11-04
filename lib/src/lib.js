const deepClone = v => JSON.parse(JSON.stringify(v));

const chunkStr = (str, size) => {
  const r = new RegExp(`.{1,${size}}`, 'g');
  return str.match(r);
}

const compose = (...fns) => {
  return fns.reduce((f, g) => (...xs) => {
    const r = g(...xs);
    return Array.isArray(r) ? f(...r) : f(r);
  });
}

const isUndefined = v => typeof v === 'undefined'

export {
  deepClone,
  chunkStr,
  compose,
  isUndefined,
}
