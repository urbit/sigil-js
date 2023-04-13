declare module '@tlon/sigil-js';

type Attributes = {
  version?: string;
  class?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
  xmlns?: string;
  id?: string;
  'clip-path'?: string;
  d?: string;
  stroke?: string;
  'stroke-width'?: string;
  x1?: string;
  x2?: string;
  y2?: string;
  'stroke-linecap'?: string;
  cx?: string;
  cy?: string;
  r?: string;
  x?: string;
  y?: string;
  transform?: string;
  'vector-effect'?: string;
  dataisgeon?: string;
} & Record<string, string>;

type Ast = {
  name: string;
  type: string;
  value: string;
  attributes: Attributes;
  children: Ast[];
};

type Config = {
  /**
   * the patp that the sigil will represent, ie ~sampel-palnet
   */
  patp: string;
  /**
   * the size in pixels to draw the sigil, defaults to 128px
   */
  size?: number;
  /**
   * whether to include a margin around the sigil, defaults to true
   */
  margin?: boolean;
  /**
   * whether to simplify the shapes inside the sigil for use as an icon.
   * removes margin automatically
   */
  icon?: boolean;
  /**
   * the foreground color of the symbols
   */
  fg?: string;
  /**
   * the background color of the rectangle behind the symbols
   */
  bg?: string;
  /**
   * a function which determines how to scale the strokes based on size
   */
  strokeScalingFunction?: (size: number) => number;
};

export {Attributes, Ast, Config};
