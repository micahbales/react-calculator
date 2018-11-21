import * as React from 'react';
import { AppState } from './definitions';
import './App.css';

class App extends React.Component {

  operate = {
    '*': (x: number, y: number) => Math.abs(x * y),
    '/': (x: number, y: number) => Math.abs(x / y),
    '+': (x: number, y: number) => Math.abs(x + y),
    '-': (x: number, y: number) => Math.abs(x - y),
  };

  constructor(props: Object) {
    super(props);
    this.numButtonPress = this.numButtonPress.bind(this);
    this.clearButtonPress = this.clearButtonPress.bind(this);
    this.operatorButtonPress = this.operatorButtonPress.bind(this);
  }

  state: AppState = {
    displayValue: '0',
    lastValue: 0,
    operator: '',
    operatorPressed: false,
    total: 0,
  };

  numButtonPress(e: React.SyntheticEvent) {
    const state: AppState = Object.assign({}, this.state);
    const buttonValue: string = e.currentTarget.textContent ?
        e.currentTarget.textContent : '';

    // Only allow one '.' character in the display
    if (buttonValue.charCodeAt(0) === 46 && state.displayValue.includes('.')) return;

    // Determine whether to append numbers to the display, or start fresh
    state.displayValue = (state.displayValue === '0' || state.operatorPressed) ?
        buttonValue : state.displayValue += buttonValue;

    state.lastValue = Number(state.displayValue);
    state.operatorPressed = false;

    this.setState(state);
  }

  operatorButtonPress(e: React.SyntheticEvent) {
    const operator: string = e.currentTarget.textContent ? e.currentTarget.textContent : '';
    const state: AppState = Object.assign({}, this.state);
    const operatorIsEquals = operator && operator.charCodeAt(0) === 61;

    state.operatorPressed = true;

    if (operatorIsEquals && state.total !== 0) {
      state.total = this.operate[state.operator](state.total, state.lastValue);
      state.displayValue = String(state.total);
    } else {
      state.operator = operator;
      if (state.total === 0) {
        state.total = state.lastValue;
      }
    }
    this.setState(state);
  }

  clearButtonPress(e: React.SyntheticEvent) {
    e.preventDefault();

    const state = Object.assign({}, this.state);
    state.displayValue = '0';
    state.lastValue = 0;
    state.operator = '';
    state.operatorPressed = false;
    state.total = 0;
    this.setState(state);
  }

  public render() {
    return (
      <div className="app">
        <div className="calc">
          <div className="calc__row display">
            <span className="total">{this.state.displayValue}</span>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__clear" onClick={this.clearButtonPress}>clear</div>
            <div className="button calc__operator" onClick={this.operatorButtonPress}>/</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.numButtonPress}>7</div>
            <div className="button calc__num" onClick={this.numButtonPress}>8</div>
            <div className="button calc__num" onClick={this.numButtonPress}>9</div>
            <div className="button calc__operator" onClick={this.operatorButtonPress}>*</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.numButtonPress}>4</div>
            <div className="button calc__num" onClick={this.numButtonPress}>5</div>
            <div className="button calc__num" onClick={this.numButtonPress}>6</div>
            <div className="button calc__operator" onClick={this.operatorButtonPress}>-</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.numButtonPress}>1</div>
            <div className="button calc__num" onClick={this.numButtonPress}>2</div>
            <div className="button calc__num" onClick={this.numButtonPress}>3</div>
            <div className="button calc__operator" onClick={this.operatorButtonPress}>+</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num zero" onClick={this.numButtonPress}>0</div>
            <div className="button" onClick={this.numButtonPress}>.</div>
            <div className="button calc__operator" onClick={this.operatorButtonPress}>=</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
