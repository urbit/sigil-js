import stringRenderer from 'stringRenderer';
import {Sigil} from './sigil';

export class SigilImage extends Sigil {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `<image src="data:image/svg+xml;base64,${Buffer.from(
      stringRenderer(this.getAst()),
      'base64'
    )}" />`;
  }
}
