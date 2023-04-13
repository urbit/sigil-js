const deepClone = (v: any) => JSON.parse(JSON.stringify(v));

const chunkStr = (str: string, size: number) => {
  const r = new RegExp(`.{1,${size}}`, 'g');
  return str.match(r);
};

const compose = (...fns: Array<Function>) => {
  return fns.reduce((f, g) => (...xs: any) => {
    const r = g(...xs);
    return Array.isArray(r) ? f(...r) : f(r);
  });
};

const isUndefined = (v: any) => typeof v === 'undefined';

const deSig = (patp: string) => patp.replace('~', '');

export {deepClone, deSig, chunkStr, compose, isUndefined};
