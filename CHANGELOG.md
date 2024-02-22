# Changelog

- 2.1.0 (Feb 21, 2024)

  - Adds entry point to `./src/core.ts` to export `sigil` function for non-React or non-browser-based projects.

- 1.5.9 (Sep 8, 2021)

  - Corrects typo in package.json
  - Updates react dep to ^17

- 1.3.7 (Nov 4, 2019)

  - Refactors how symbols are scaled and transformed for simplicity and accuracy.
  - Adds `reactImageRenderer`, which adds a base64 encoded background image to a react element, bypassing any recursive use of `react.createElement()`.
  - Alters the `margin` config prop to a boolean, which toggles margin-driven layout behavior
  - Deprecates `iconMode`

- 1.3.5 (Jul 23, 2019)

  - Removes hard-coded inline styles and responds to #37.
