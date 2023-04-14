import sigil from './core';

if (typeof window !== 'undefined' && window.customElements) {
  import('./components/sigil').then(({ Sigil }) => {
    if (typeof customElements.get('urbit-sigil') === 'undefined') {
      customElements.define('urbit-sigil', Sigil);
    }
  }) 
  import('./components/sigil-image').then(({ SigilImage }) => {
    if (typeof customElements.get('urbit-sigil-image') === 'undefined') {
      customElements.define('urbit-sigil-image', SigilImage);
    }
  }) 
}

export * from './types';
export {sigil};
export default sigil;