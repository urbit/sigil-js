// the canvas argument is a react ref or a DOM element
// `this` is used to store references to the canvas and context
const initCanvas = (canvas, size) => {
  const { x, y } = size
  const ctx = canvas.getContext('2d')

  const ratio = ctx.webkitBackingStorePixelRatio < 2
    ? window.devicePixelRatio
    : 1

  canvas.width = x * ratio
  canvas.height = y * ratio
  canvas.style.width = x + 'px'
  canvas.style.height = y + 'px'

  return { ctx, canvas }
}

export {
  initCanvas,
}
