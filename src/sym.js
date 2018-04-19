import paper, {
  Project,
  Path,
  Point,
  Group,
  Layer,
  Shape,
  Rectangle,
} from 'paper'

// const origin = new Point(0, 0)
// const bound = new Point(100, 100)

const extent = 128
const unit = 32
const origin = 0

// Point: x, y
const alphabet = {
  a: params => {
    const to = new Point(unit ,  extent)
    const from = new Point(origin, origin)
    return new Path.Rectangle({ from, to, ...params })
  },
  b: params => {
    const to = new Point(unit * 2, extent)
    const from = new Point(origin, origin)
    return new Path.Rectangle({ from, to, ...params })
  },
  c: params => {
    const to = new Point(unit * 3, extent)
    const from = new Point(origin, origin)
    return new Path.Rectangle({ from, to, ...params })
  },
  d: params => {
    const to = new Point(unit * 4, extent)
    const from = new Point(origin, origin)
    return new Path.Rectangle({ from, to, ...params })
  },
  e: params => {
    const ra = new Path.Rectangle({
      to: new Point(extent, unit),
      from: new Point(origin, origin),
      ...params
    })

    const rb = new Path.Rectangle({
      to: new Point(extent, unit * 4),
      from: new Point(origin, unit * 3),
      ...params
    })

    return new Group(ra, rb)
  },
  f: params => {
    const center = new Point(extent / 2, extent / 2)
    const radius = extent / 2
    return new Path.Circle({ center, radius, ...params })
  },
  g: params => {
    const center = new Point(extent / 2, extent / 2)
    const radius = extent / 4
    return new Path.Circle({ center, radius, ...params })
  },
  h: params => {
    const center = new Point(extent / 2, extent / 2)
    const radius = extent / 8
    return new Path.Circle({ center, radius, ...params })
  },
  i: params => {
    const to = new Point(extent / 2, extent / 2)
    const from = new Point(origin, origin)
    return new Path.Rectangle({ from, to, ...params })
  },
  j: params => {
    const to = new Point(extent, extent / 2)
    const from = new Point(extent / 2 , origin)
    return new Path.Rectangle({ from, to, ...params })
  },
  k: params => {
    const to = new Point(extent / 2, extent)
    const from = new Point(origin, origin)
    return new Path.Rectangle({ from, to, ...params })
  },
}

export default alphabet
