import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { defaultTheme } from './theme';

/**
 * @class Numbers
 * @private
 */
class Numbers extends PureComponent {
  static propTypes = {
    /** @type {Number} [0] delay - animation delay */
    delay: PropTypes.number,
    /** @type {Array} [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] values */
    values: PropTypes.array,
    /** @type {Number} [0] number - number to move to */
    number: PropTypes.number,
    /** @type {Number} [1000] duration - animation duration in milliseconds */
    duration: PropTypes.number,
    /** @type {Object} theme - react-themeable */
    theme: PropTypes.object,
  };

  static defaultProps = {
    values: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    number: 0,
    delay: 85,
    duration: 700,
  };

  constructor(props) {
    super(props);
    this.hasLoaded = false;
  }

  componentDidMount() {
    this.hasLoaded = true;
    this.timeout = setTimeout(() => {
      this.forceUpdate();
    }, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {
      delay, values, number, duration, theme,
    } = this.props;
    const display = (this.hasLoaded ? number : 0);
    const style = {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transform: `translate(0, ${display}em)`,
    };
    return (
      <div className={theme.group} style={style}>
        {values.map((v) => <div key={v} className={theme.number}>{v}</div>)}
      </div>
    );
  }
}

/**
 * @class Reels
 */
class Reels extends PureComponent {
  static getNumbers(number) {
    return number.toString().split('').map((n) => parseInt(n, 10));
  }
  static stripNonNumbers = (str) => str.match(/\d/g).join('');

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

  constructor(props) {
    super(props);
    const { number } = this.props;
    this.state = { number };
  }

  /**
   * This method updates the state with the delay array which identifies which numbers have changes in what index
   * @param nextProps
   * @param prevState
   * @return {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const formatter = new Intl.NumberFormat(nextProps.locale, nextProps.options);

    const strippedPrev = +Reels.stripNonNumbers(formatter.format(prevState.number));
    const strippedNext = +Reels.stripNonNumbers(formatter.format(nextProps.number));

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
      number: nextProps.number,
      delayArray,
    };
  }

  /**
   * This method returns the desired animation delay at the given integer index
   * @param {Number} index - Int index of the formatted number, e.g. £111,211 number 2 would be index of 4
   * @return {number}
   */
  delay(index) {
    const { delayArray } = this.state;
    const { delay } = this.props;
    if (!delayArray) {
      return 0;
    }
    const indexDelay = delayArray.indexOf(index);
    return (indexDelay > -1 ? indexDelay : 0) * delay;
  }

  /**
   * This method handles the render cycle of each reel
   * @param parts
   * @return {*}
   */
  renderReels = (parts) => {
    let ind = 0;
    const { duration, theme } = this.props;

    const values = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    return parts.map(({ type, value }, partIndex) => {
      switch (type) {
        case 'integer':
        case 'fraction':
          // both integers and fractions contain numbers we want to spin
          return (
            <React.Fragment key={type + partIndex}>
              {
                Reels.getNumbers(value).map((number, intIndex) => {
                  const output = (
                    <Numbers
                      theme={theme}
                      duration={duration}
                      key={type + partIndex + intIndex} // eslint-disable-line
                      delay={this.delay(ind)}
                      number={number}
                      values={values}
                    />
                  );
                  ind++;
                  return output;
                })
              }
            </React.Fragment>
          );
        // for any other segment we want a static reel with one value in it's array
        default: return <Numbers theme={theme} duration={duration} key={type + partIndex} values={[value]} />; // eslint-disable-line
      }
    });
  };

  render() {
    const { locale, options, number, theme } = this.props;
    const formatter = new Intl.NumberFormat(locale, options);
    const format = formatter.format(number); // pretty format for a11y
    const parts = formatter.formatToParts(number);

    return (
      <div aria-label={format}>
        <div role="presentation" className={theme.reel}>
          {this.renderReels(parts)}
        </div>
      </div>
    );
  }
}

export default Reels;
