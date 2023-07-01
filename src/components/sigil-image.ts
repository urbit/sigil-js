import {Sigil} from './sigil';

export class SigilImage extends Sigil {
  render() {
    if (!this.shadowRoot) {
      return;
    }

    const img = this.shadowRoot.getElementById('sigil');
    if (img) {
      this.shadowRoot.removeChild(img);
    }

    const template = document.createElement('template');
    template.innerHTML = `<image src="data:image/svg+xml;base64,${Buffer.from(
      this.getSvg()
    ).toString('base64')}" />`;
    const comp = template.content.childNodes[0] as HTMLElement;
    comp.id = 'sigil';

    this.shadowRoot.appendChild(comp);
  }
}