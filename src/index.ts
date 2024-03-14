import sigil from './core';
import { Sigil } from './components/sigil';
import { SigilImage } from './components/sigil-image';


if (typeof window !== 'undefined' && window.customElements) {
  if (typeof customElements.get('urbit-sigil') === 'undefined') {
    customElements.define('urbit-sigil', Sigil);
  }
  if (typeof customElements.get('urbit-sigil-image') === 'undefined') {
    customElements.define('urbit-sigil-image', SigilImage);
  } 
}

export * from './types';
export {sigil};
export default sigil;
