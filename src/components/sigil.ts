import sigil from '../core';
import memoize from 'lodash.memoize';

const deSig = (patp: string) => patp.replace('~', '');
const memSigil = memoize(arg => sigil(arg).trim(),
  (props) => JSON.stringify(Object.values(props))
);
const template = document.createElement('template');
template.innerHTML = `<style>
      :host {
        display: inline-flex;
      }
    </style>`;

export class Sigil extends HTMLElement {
  static get observedAttributes() {
    return ['point', 'size', 'foreground', 'background', 'space', 'detail'];
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  getSvg() {
    return memSigil({
      point: deSig(this.point || 'zod'),
      size: this.size ? parseInt(this.size) : undefined,
      foreground: this.foreground,
      background: this.background,
      space: this.space,
      detail: this.detail,
    });
  }

  render() {
    if (!this.shadowRoot) {
      return;
    }

    const svg = this.shadowRoot.getElementById('sigil');
    if (svg) {
      this.shadowRoot.removeChild(svg);
    }

    const template = document.createElement('template');
    template.innerHTML = this.getSvg();
    const comp = template.content.childNodes[0] as HTMLElement;
    comp.id = 'sigil';
    this.shadowRoot.appendChild(comp);
  }

  get point() {
    return this.getAttribute('point');
  }

  get size() {
    return this.getAttribute('size');
  }

  get foreground() {
    return this.getAttribute('foreground') || undefined;
  }

  get background() {
    return this.getAttribute('background') || undefined;
  }

  get space() {
    const attr = this.getAttribute('space');
    if (attr === 'none' || attr === 'default' || attr === 'large') {
      return attr;
    }

    return undefined
  }

  get detail() {
    const attr = this.getAttribute('detail');
    if (attr === 'none' || attr === 'default') {
      return attr;
    }

    return undefined
  }
}
