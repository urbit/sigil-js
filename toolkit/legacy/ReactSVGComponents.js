import React from 'react'

const get = (o, p, d) => {
  if (o[p] === undefined) {
    return d
  } else {
    return o[p]
  }
}


const r = p => {
  return get(p, 'children', []).map((a, c) => `${a} ${ReactSVGComponents[c.tag](c)}`, '');
}

const ReactSVGComponents = {
  svg:      p => <svg {...p.attr} version={'1.1'} xmlns={'http://www.w3.org/2000/svg'}>{ r(p) }</svg>,

  circle:   p => <circle {...p.attr}>{ r(p) }</circle>,

  rect:     p => <rect {...p.attr}>{ r(p) }</rect>,

  path:     p => <path {...p.attr}>{ r(p) }</path>,

  g:        p => <g {...p.attr}>{ r(p) }</g>,

  polygon:  p => <polygon {...p.attr}>{ r(p) }</polygon>,

  line:     p => <line {...p.attr}>{ r(p) }</line>,

  polyline: p => <polyline {...p.attr}>{ r(p) }</polyline>,
}

export default ReactSVGComponents
