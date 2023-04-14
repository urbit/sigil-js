import sigil from '../core';
import {deSig} from '../lib';
import memoize from 'lodash.memoize';
import stringRenderer from '../stringRenderer';

const memSigil = memoize(
  args => stringRenderer(sigil(args)),
  ({strokeScalingFunction, ...props}) => JSON.stringify(Object.values(props))
);
const template = document.createElement('template');
template.innerHTML = `<style>
      :host {
        display: inline-flex;
      }
    </style>`;

export class Sigil extends HTMLElement {
  static get observedAttributes() {
    return ['patp', 'size', 'fg', 'bg', 'icon', 'margin'];
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
      patp: deSig(this.patp || 'zod'),
      size: this.size ? parseInt(this.size) : undefined,
      fg: this.fg,
      bg: this.bg,
      icon: this.icon,
      margin: this.margin,
    });
  }

  render() {
    if (!this.shadowRoot) {
      return;
    }

    const svg = this.shadowRoot.getElementById('svg');
    if (svg) {
      this.shadowRoot.removeChild(svg);
    }

    const template = document.createElement('template');
    template.innerHTML = this.getSvg();
    const comp = template.content.childNodes[0] as HTMLElement;
    comp.id = 'svg';

    if (this.size) {
      comp.style.height = `${this.size}px`;
      comp.style.width = `${this.size}px`;
    }
    this.shadowRoot.appendChild(comp);
  }

  get patp() {
    return this.getAttribute('patp');
  }

  get size() {
    return this.getAttribute('size');
  }

  get fg() {
    return this.getAttribute('fg') || undefined;
  }

  get bg() {
    return this.getAttribute('bg') || undefined;
  }

  get margin() {
    const attr = this.getAttribute('margin');
    return typeof attr === 'string' ? true : undefined;
  }

  get icon() {
    const attr = this.getAttribute('icon');
    return typeof attr === 'string' ? true : undefined;
  }
}
