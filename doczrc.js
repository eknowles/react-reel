const pkg = require('./package.json');

// import { css } from 'docz-plugin-css'

export default {
  title: pkg.name,
  description: pkg.description,
  source: './docz',
  plugins: [
    // css({ cssmodules: true })
  ],
};
