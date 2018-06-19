# react-reel

> Animate anything like a slot machine

[![NPM](https://img.shields.io/npm/v/react-reel.svg)](https://www.npmjs.com/package/react-reel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub stars](https://img.shields.io/github/stars/eknowles/react-reel.svg)](https://github.com/eknowles/react-reel/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/eknowles/react-reel.svg)](https://github.com/eknowles/react-reel/issues)

[![Example](https://eknowles.github.io/react-reel/reel.gif)](https://eknowles.github.io/react-reel/)

## Features

- Fully themeable
- Highly performant, runs at 60fps
- Animates anything you want!

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
      <Reel text="$34.42" />
    )
  }
}
```

## Props

```javascript
  static propTypes = {
    /** @type {string} text */
    text: PropTypes.string.isRequired,
    /** @type {number} [1000] duration - animation duration in milliseconds */
    duration: PropTypes.number,
    /** @type {number} DELAY - delay between each sibling animation */
    delay: PropTypes.number,
    /** @type {{reel: string, group: string, number: string}} theme - react-themeable */
    theme: PropTypes.any,
  };

  static defaultProps = {
    duration: 700,
    delay: 85,
    theme: defaultTheme,
  };
```


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
