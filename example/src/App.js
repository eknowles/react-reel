import React, { Component } from 'react'
import Chance from 'chance';

import NumberCounter from 'react-reel'

import {locales, currencies} from './constants';

const chance = new Chance();
const randomElement = (arr) => arr[Math.floor(Math.random() * (arr.length))];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: { code: 'en', name: 'English' },
      currency: { code: 'GBP', name: 'United Kingdom Pound' },
      pct: 0.5,
      currencyAmount: 1234,
    };
  }

  random = () => (this.setState({
    currencyAmount: chance.natural({ min: 10000, max: 20000 }),
    pct: Math.random(),
    locale: randomElement(locales),
    currency: randomElement(currencies),
  }));

  render() {
    const {locale, currency, pct, currencyAmount} = this.state;

    return (
      <div className="example" onClick={this.random}>
        <NumberCounter
          locale={locale.code}
          number={currencyAmount}
          options={
            {style: 'currency', currency: currency.code}
          }
        />
        <p>You are viewing <strong>{currencyAmount}</strong> <strong>{currency.name}</strong> displayed in <strong>{locale.name}</strong></p>

        <NumberCounter
          locale={locale.code}
          number={currencyAmount}
          options={
            {style: 'decimal'}
          }
        />
        <p>Formatted as a decimal</p>

        <NumberCounter
          locale={locale.code}
          number={pct}
          options={
            {style: 'percent', minimumFractionDigits: 1}
          }
        />
        <p>A percentage should be a float less than or equal to 1 ({pct})</p>
      </div>
    );
  }
}
