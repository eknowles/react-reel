import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import themeable from 'react-themeable';

import { defaultTheme } from './theme';

/**
 * @class Numbers
 * @private
 */
class Numbers extends PureComponent {
  static propTypes = {
    /** @type {number} [0] delay - animation delay */
    delay: PropTypes.number,
    /** @type {Array} [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] values */
    values: PropTypes.array,
    /** @type {number} [0] number - number to move to */
    number: PropTypes.number,
    /** @type {number} [1000] duration - animation duration in milliseconds */
    duration: PropTypes.number,
    /** @type {object} theme - react-themeable */
    theme: PropTypes.func
  };

  static defaultProps = {
    values: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    number: 0,
    delay: 0,
    duration: 700
  };

  constructor(props) {
    super(props);
    this.hasLoaded = false;
  }

  componentDidMount() {
    this.hasLoaded = true;
    this.timeout = setTimeout(() => {
      this.forceUpdate();
    }, 20);
  }

  componentDidUpdate() {
    clearTimeout(this.timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { delay, values, number, duration, theme } = this.props;
    const display = this.hasLoaded ? number : 0;
    const style = {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transform: `translate(0, ${display}em)`
    };

    const t =
      values.length > 1
        ? { ...theme(2, 'group') }
        : values[0] === '.'
          ? { ...theme(4, 'dot') }
          : values[0] === ','
            ? { ...theme(5, 'comma') }
            : { ...theme(6, 'separator') };

    return (
      <div {...t} style={style}>
        {values.map(v => (
          <div key={v} {...theme(v, 'number')}>
            {v}
          </div>
        ))}
      </div>
    );
  }
}

/**
 * @class Reels
 */
class Reels extends PureComponent {
  static TYPE_STRING = 'string';
  static TYPE_INT = 'integer';
  static TYPE_FRACTION = 'fraction';
  static getNumbers(number) {
    return number
      .toString()
      .split('')
      .map(n => parseInt(n, 10));
  }
  static stripNonNumbers = str => str && (str.match(/\d/g) || []).join('');

  static propTypes = {
    /** @type {string} text */
    text: PropTypes.string.isRequired,
    /** @type {number} [1000] duration - animation duration in milliseconds */
    duration: PropTypes.number,
    /** @type {number} DELAY - delay between each sibling animation */
    delay: PropTypes.number,
    /** @type {{reel: string, group: string, number: string}} theme - react-themeable */
    theme: PropTypes.any
  };

  static defaultProps = {
    duration: 700,
    delay: 85,
    theme: defaultTheme
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  /**
   * This method updates the state with the delay array which identifies which numbers have changes in what index
   * @param nextProps
   * @param prevState
   * @return {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const strippedPrev = +Reels.stripNonNumbers(prevState.text);
    const strippedNext = +Reels.stripNonNumbers(nextProps.text);

    if (strippedPrev === strippedNext) {
      return null;
    }

    const prevNum = Reels.getNumbers(strippedPrev);
    const nextNum = Reels.getNumbers(strippedNext);
    const delayArray = [];

    for (let i = 0; i < nextNum.length; i++) {
      if (nextNum[i] !== prevNum[i]) {
        delayArray.push(i);
      }
    }

    return {
      text: nextProps.text,
      delayArray
    };
  }

  /**
   * This method returns the desired animation delay at the given integer index
   * @param {number} index - Int index of the formatted number, e.g. £111,211 number 2 would be index of 4
   * @return {number}
   */
  delay(index) {
    const { delayArray } = this.state;
    const { delay } = this.props;

    if (!delayArray) {
      return 0;
    }

    const indexDelay = delayArray.indexOf(index);

    return (indexDelay > -1 ? indexDelay + 1 : 0) * delay;
  }

  /**
   * This method handles the render cycle of each reel
   * @param parts
   * @param theme
   * @return {*}
   */
  renderReels = (parts, theme) => {
    let ind = 0;
    let strInd = 0;
    const { duration } = this.props;

    const values = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    return parts.map(({ type, value }, partIndex) => {
      switch (type) {
        case Reels.TYPE_INT:
        case Reels.TYPE_FRACTION:
          // both integers and fractions contain numbers we want to spin
          return (
            <React.Fragment key={type + partIndex}>
              {Reels.getNumbers(value).map(number => {
                const output = (
                  <Numbers
                    theme={theme}
                    duration={duration}
                    key={type + ind}
                    delay={this.delay(ind)}
                    number={number}
                    values={values}
                  />
                );

                ind++;

                return output;
              })}
            </React.Fragment>
          );
        // for any other segment we want a static reel with one value in it's array
        default:
          const output = (
            <Numbers theme={theme} key={type + strInd} values={[value]} />
          );

          strInd++;

          return output;
      }
    });
  };

  /**
   * This method walks though the given string and returns an array of parts, similar to formatToParts in Intl API
   * @param text
   * @return {Array<{type: string, value: string}>} Parts array
   */
  getParts = text => {
    const parts = [];

    let lastType = null;

    for (let i = 0; i < text.length; i++) {
      const isInt = !isNaN(parseInt(text[i], 10));
      const type = isInt ? Reels.TYPE_INT : Reels.TYPE_STRING;
      const isSame =
        (lastType === Reels.TYPE_INT && isInt) ||
        (lastType === Reels.TYPE_STRING && !isInt);

      if (isSame) {
        parts[parts.length - 1].value += text[i];
      } else {
        parts.push({ type, value: text[i] });
      }

      lastType = type;
    }

    return parts;
  };

  render() {
    const theme = themeable(this.props.theme);
    const parts = this.getParts(this.props.text);

    return (
      <div aria-label={this.props.text} {...theme(0, 'container')}>
        <div role='presentation' {...theme(1, 'reel')}>
          {this.renderReels(parts, theme)}
        </div>
      </div>
    );
  }
}

export default Reels;
