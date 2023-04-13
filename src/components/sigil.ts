import sigil from '../core';
import {deSig} from '../lib';
import memoize from 'lodash.memoize';
import stringRenderer from '../stringRenderer';

const memSigil = memoize(sigil, ({strokeScalingFunction, ...props}) =>
  JSON.stringify(Object.values(props))
);

export class Sigil extends HTMLElement {
  static get observedAttributes() {
    return ['patp', 'size', 'fg', 'bg', 'icon', 'margin'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  protected getAst() {
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
    this.innerHTML = stringRenderer(this.getAst());
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
    return this.getAttribute('margin') === 'true';
  }

  get icon() {
    return this.getAttribute('icon') === 'true';
  }
}
