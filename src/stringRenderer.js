
const get = (object, path, fallback) => {
  if  (object[path] === undefined) return fallback
  return object[path]
}


// converts object to XML attr string
const p2s = o => {
  if (o !== undefined) {
    return Object.entries(o).reduce((a, [k, v]) => `${a}${c2k(k)}='${v}' `, '')
  }
  return
}


// converts camelCase to kebab-case
// note: this is a hack because SVG has both kebab-case and camelCase attrs
const c2k = str => str
  .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
  .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)


const r = p => {
  return get(p, 'children', []).reduce((a, c) => `${a} ${stringRenderer[c.tag](c)}`, '');
}


const stringRenderer = {
  svg:        p => `<svg ${p2s(p.attr)} version='1.1' xmlns='http://www.w3.org/2000/svg'>${r(p)}</svg>`,

  circle:     p => `<circle ${p2s(p.attr)}>${r(p)}</circle>`,

  rect:       p => `<rect ${p2s(p.attr)}>${r(p)}</rect>`,

  path:       p => `<path ${p2s(p.attr)}>${r(p)}</path>`,

  g:          p => `<g ${p2s(p.attr)}>${r(p)}</g>`,

  polygon:    p => `<polygon ${p2s(p.attr)}>${r(p)}</polygon>`,

  line:       p => `<line ${p2s(p.attr)}>${r(p)}</line>`,

  polyline:   p => `<polyline ${p2s(p.attr)}>${r(p)}</polyline>`,
}

export default stringRenderer
