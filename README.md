# react-reel

> Animate numbers in any language or format, with Intl.NumberFormat

[![NPM](https://img.shields.io/npm/v/react-reel.svg)](https://www.npmjs.com/package/react-reel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-reel
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-reel'

class Example extends Component {
  render () {
    return (
      <MyComponent
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
