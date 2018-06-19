import React, { Component } from 'react'
import Chance from 'chance';

import NumberCounter from 'react-reel'

import {locales, currencies} from './constants';

const chance = new Chance();
const randomElement = (arr) => arr[Math.floor(Math.random() * (arr.length))];

const theme = {
  reel: {
    height: '1em',
    display: 'flex',
    alignItems: 'flex-end',
    overflowY: 'hidden',
    fontSize: '45px',
    fontWeight: '300',
    color: '#E2AB5B',
    borderBottom: '1px solid #0492BD',
    lineHeight: '0.95em'
  },
  group: {
    transitionDelay: '0ms',
    transitionTimingFunction: 'ease-in-out',
    transform: 'translate(0, 0)',
    height: '1em'
  },
  number: {
    height: '1em'
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: { code: 'en', name: 'English' },
      currency: { code: 'GBP', name: 'United Kingdom Pound' },
      pct: 0.5,
      currencyAmount: 1234,
      customNumber: false,
      myNumber: '2018-6-19'
    };
  }

  random = () => {
    this.setState({
      currencyAmount: chance.natural({ min: 0, max: 2000 }),
      pct: Math.random(),
      locale: randomElement(locales),
      currency: randomElement(currencies),
    });
    this.setState({customNumber: !this.state.customNumber, myNumber: this.state.customNumber ? '19-6-2018' : '19.06.2018.'});
  };

  render() {
    const {locale, currency, pct, currencyAmount} = this.state;

    const demoCurrency = new Intl.NumberFormat(locale.code, {style: 'currency', currency: currency.code}).format(currencyAmount);
    const demoDecimal = new Intl.NumberFormat(locale.code, {style: 'decimal'}).format(currencyAmount);
    const demoPercent = new Intl.NumberFormat(locale.code, {style: 'percent', minimumFractionDigits: 1}).format(pct);
    const demoDate = new Intl.DateTimeFormat(locale.code).format(new Date());

    return (
      <div className='example' onClick={this.random}>
        <NumberCounter theme={theme} text={demoCurrency} />
        <p>You are viewing <strong>{currencyAmount}</strong> <strong>{currency.name}</strong> displayed in <strong>{locale.name}</strong></p>
        <NumberCounter theme={theme} text={demoDecimal} />
        <p>Formatted as a decimal</p>
        <NumberCounter theme={theme} text={demoPercent} />
        <p>A percentage should be a float less than or equal to 1 ({pct})</p>
        <NumberCounter theme={theme} text={demoDate} />
        <p>Today's date formatted in <strong>{locale.name}</strong></p>
      </div>
    );
  }
}
