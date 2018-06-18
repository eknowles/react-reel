# react-reel

> Animate numbers in any language or format, with Intl.NumberFormat

[![NPM](https://img.shields.io/npm/v/react-reel.svg)](https://www.npmjs.com/package/react-reel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub stars](https://img.shields.io/github/stars/eknowles/react-reel.svg)](https://github.com/eknowles/react-reel/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/eknowles/react-reel.svg)](https://github.com/eknowles/react-reel/issues)

[![Example](https://eknowles.github.io/react-reel/reel.gif)](https://eknowles.github.io/react-reel/)

## Features

- Fully themeable
- 60fps
- Animates percentages, decimals and currencies

## Install

```bash
$ npm install --save react-reel
```

or

```bash
$ yarn add react-reel
```

## Basic Usage

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

## Props

```javascript
  static propTypes = {
    /** @type {Number} number - number to move to */
    number: PropTypes.number,
    /** @type {Number} [1000] duration - animation duration in milliseconds */
    duration: PropTypes.number,
    /** @type {number} DELAY - delay between each sibling animation */
    delay: PropTypes.number,
    /** @type {String} [en-GB] locale - BCP 47 lang tag */
    locale: PropTypes.string,
    /** @type {String} options - NumberFormat API options */
    options: PropTypes.object,
    /** @type {Object} theme - react-themeable */
    theme: PropTypes.object,
  };

  static defaultProps = {
    number: 0,
    duration: 700,
    delay: 85,
    locale: 'en-GB',
    options: {
      style: 'currency', currency: 'GBP', maximumFractionDigits: 0, minimumFractionDigits: 0,
    },
    theme: defaultTheme,
  };
```

| Prop | Types | Required/Default | Description |
| --- | --- | --- |
| number | number | ✓ | number to move to |
| duration | number | `700` | animation duration in milliseconds |
| delay | number | `85` | delay between each sibling animation |
| locale | string | `en-gb` | BCP 47 lang tag |
| options | object | `{style: 'currency', currency: 'GBP', maximumFractionDigits: 0, minimumFractionDigits: 0}` | NumberFormat API options |
| theme | object | See below | react-themeable object |

## Theme

This uses [react-themeable](https://github.com/markdalgleish/react-themeable)

react-reel comes with no styles.

It uses react-themeable that allows you to style your component using CSS Modules, Radium, Aphrodite, JSS, Inline styles, and global CSS.

For example, to style using CSS Modules, do:

```css
.group {
  transition-delay: 0ms;
  transition-timing-function: ease-in-out;
  transform: translate(0, 0);
}

.group .number {
  height: 1em;
}

.reel {
  height: 1em;
  display: flex;
  align-items: flex-end;
  overflow-y: hidden;

  /** CUSTOMISE BELOW */
  font-size: 45px;
  font-weight: 300;
  color: #E2AB5B;
  border-bottom: 1px solid #0492BD;
  line-height: 0.95em; /* adjusted for Lato font */
}
```

```javascript
import theme from 'theme.css';
```

```javascript
<Reel theme={theme} ... />
```

When not specified, theme defaults to:

```javascript
{
  reel:   'react-reel__reel',
  group:  'react-reel__group',
  number: 'react-reel__number',
}
```

## License

MIT © [eknowles](https://github.com/eknowles)
