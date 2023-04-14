type Config = {
  /**
   * the point that the sigil will represent, ie ~sampel-palnet
   */
  point: string,

  /**
   * the background color of the rectangle behind the symbols
   */
  background?: string,
  /**
   * the foreground color of the symbols
   */
  foreground?: string,
  
  /**
   * whether to simplify the shapes inside the sigil for use as an icon.
   */
  detail?: 'none' | 'default',
  /**
   * how much space around the sigil itself
   */
  space?: 'none' | 'default' | 'large',

  /**
   * the size in pixels to draw the sigil, defaults to 128px
   */
  size?: number,
}

type SymbolIndex = {
  [key: string]:string
}

export {
  Config,
  SymbolIndex, 
}