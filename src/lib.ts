import symbolDefs from './symbolDefs.json';
import parts from './parts.json';
import { Ast } from '../types';

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

const symbolFromDef = (symbolDef: string[]): Ast => {
  const badParts: string[] = [];
  const symbolParts = symbolDef.map((partKey) => {
    // @ts-ignore
    const part = parts[partKey];
    if (!part) {
      badParts.push(partKey);
    } else {
      part.attributes['part-key'] = partKey;
      return part;
    }
  });

  if (badParts.length > 0) {
    throw new Error(`Symbol def included invalid part keys: ${badParts.join(', ')}`);
  }

  return {
    children: symbolParts,
    name: "g",
    attributes: {
      fill: "none",
    },
  };
}

const symbolFromPhoneme = (phoneme: string): (Ast | undefined) => {
  // @ts-ignore
  const symbolDef = symbolDefs[phoneme];
  if (isUndefined(symbolDef))
    return undefined;
  return symbolFromDef(symbolDef);
}

function calculatePartParents() {
  const parents: { [partId: string]: string[] } = {};
  Object.entries(symbolDefs).forEach(([key, value]) => {
    value.forEach(partId => {
      if (!parents[partId]) parents[partId] = [];
      const part = parents[partId];
      part.push(key);
    });
  });
  return parents;
}

const partParents = calculatePartParents();

export {
  deepClone, chunkStr, compose, isUndefined,
  symbolFromDef,
  symbolFromPhoneme,
  partParents,
};
