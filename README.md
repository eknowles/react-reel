# react-reel

> Animate numbers in any language or format, with Intl.NumberFormat

[![NPM](https://img.shields.io/npm/v/react-reel.svg)](https://www.npmjs.com/package/react-reel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub stars](https://img.shields.io/github/stars/eknowles/react-reel.svg)](https://github.com/eknowles/react-reel/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/eknowles/react-reel.svg)](https://github.com/eknowles/react-reel/issues)

[![Example](https://eknowles.github.io/react-reel/reel.gif)](https://eknowles.github.io/react-reel/)

## Install

```bash
npm install --save react-reel
```

## Usage

```jsx
import React, { Component } from 'react'

import Reel from 'react-reel'

class Example extends Component {
  render () {
    return (
      <Reel
        locale="en-GB"
        number={123456789}
        options={
          {style: 'decimal'}
        }
      />
    )
  }
}
```

## License

MIT © [eknowles](https://github.com/eknowles)
