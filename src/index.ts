import stringRenderer from 'stringRenderer';
import sigil from 'core';
import {Sigil as SigilComponent} from 'components/sigil';
import {SigilImage} from 'components/sigil-image';

if (customElements) {
  customElements.define('urbit-sigil', SigilComponent);
  customElements.define('urbit-sigil-image', SigilImage);
}

export {sigil, stringRenderer};
