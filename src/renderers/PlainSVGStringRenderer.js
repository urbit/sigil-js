import { get } from 'lodash'


// converts object to XML attr
const p2s = obj => {
  if (obj !== undefined) {
    return Object.entries(obj).reduce((acc, [k, v]) => `${acc}${c2k(k)}='${v}' `, '')
  }
  return
}


// converts camelCase to kebab-case
const c2k = str => str
  .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
  .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)



const recurse = p => {
  return get(p, 'children', []).reduce((a, c) => `${a} ${PlainSVGStringRenderer[c.tag](c)}`, '');
}



const PlainSVGStringRenderer = {
  svg: p => {
    return (
      `<svg ${p2s(p.attr)} version='1.1' xmlns='http://www.w3.org/2000/svg'>
       ${recurse(p)}
      </svg>`
    )
  },
  circle: p => {
    return (
      `<circle ${p2s(p.attr)}>
      ${recurse(p)}
      </circle>`
    )
  },
  rect: p => {
    return (
      `<rect ${p2s(p.attr)}>
      ${recurse(p)}
      </rect>`
    )
  },
  path: p => {
    return (
      `<path ${p2s(p.attr)}>
      ${recurse(p)}
      </path>`
    )
  },
  g: p => {
    return (
      `<g ${p2s(p.attr)}>
        ${recurse(p)}
      </g>`
    )
  },
  polygon: p => {
    return (
      `<polygon ${p2s(p.attr)}>
      ${recurse(p)}
      </polygon>`
    )
  },
  line: p => {
    return (
      `<line ${p2s(p.attr)}>
      ${recurse(p)}
      </line>`
    )
  },
  polyline: p => {
    return (
      `<polyline ${p2s(p.attr)}>
      ${recurse(p)}
      </polyline>`
    )
  }
}

export default PlainSVGStringRenderer
