import * as React from 'react';
import { AppState } from './definitions';
import './App.css';

class App extends React.Component {

  numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  operatorKeys = ['+', '*', '/', '-', '=', 'Enter'];
  operate = {
    '*': (x: number, y: number) => Math.abs(x * y),
    '/': (x: number, y: number) => Math.abs(x / y),
    '+': (x: number, y: number) => Math.abs(x + y),
    '-': (x: number, y: number) => Math.abs(x - y),
  };

  static limitDecimals(displayValue: string) {
    const val = Number(displayValue);
    return Math.round(val * 1000) / 1000;
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  constructor(props: Object) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.clearButtonPress = this.clearButtonPress.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.operatorButtonPress = this.operatorButtonPress.bind(this);
    this.updateDisplayValue = this.updateDisplayValue.bind(this);
  }

  state: AppState = {
    displayValue: '0',
    lastValue: 0,
    operator: '',
    operatorPressed: false,
    total: 0,
  };

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'c') return this.clearButtonPress(e);
    if (e.key === 'Backspace') return this.handleBackspace();
    this.handleInput(e.key);
  }

  handleButtonPress(e: React.SyntheticEvent) {
    const buttonValue: string = e.currentTarget.textContent ? e.currentTarget.textContent : '';
    this.handleInput(buttonValue);
  }

  handleInput(key: string) {
    const isUpdateKey = this.numberKeys.includes(key);
    if (isUpdateKey) this.updateDisplayValue(key);

    const isOperatorKey = this.operatorKeys.includes(key);
    if (isOperatorKey) this.operatorButtonPress(key);
  }

  updateDisplayValue(buttonValue: string) {
    const state: AppState = Object.assign({}, this.state);

    // Only allow one '.' character in the display
    if (buttonValue === '.' && state.displayValue.includes('.')) return;

    // Determine whether to append numbers to the display, or start fresh
    state.displayValue = (state.displayValue === '0' || state.operatorPressed) ?
        buttonValue : state.displayValue += buttonValue;

    state.lastValue = Number(state.displayValue);
    state.operatorPressed = false;

    this.setState(state);
  }

  operatorButtonPress(buttonValue: string) {
    const operator = buttonValue;
    const state: AppState = Object.assign({}, this.state);
    const operatorIsEquals = operator && operator === '=' || operator === 'Enter';

    // Ignore 'equals' unless we already have two values to compare
    if (operatorIsEquals && state.total === 0) return;
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

  clearButtonPress(e: React.SyntheticEvent | KeyboardEvent) {
    e.preventDefault();

    const state = Object.assign({}, this.state);
    state.displayValue = '0';
    state.lastValue = 0;
    state.operator = '';
    state.operatorPressed = false;
    state.total = 0;
    this.setState(state);
  }

  handleBackspace() {
    const state = Object.assign({}, this.state);

    state.displayValue = state.displayValue.length < 2 ? '0' :
        state.displayValue.substring(0, state.displayValue.length - 1);
    state.lastValue = Number(state.displayValue);

    this.setState(state);
  }

  public render() {
    return (
      <div className="app">
        <div className="calc">
          <div className="calc__row display">
            <span className="total">{App.limitDecimals(this.state.displayValue)}</span>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__clear" onClick={this.clearButtonPress}>clear</div>
            <div className="button calc__operator" onClick={this.handleButtonPress}>/</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.handleButtonPress}>7</div>
            <div className="button calc__num" onClick={this.handleButtonPress}>8</div>
            <div className="button calc__num" onClick={this.handleButtonPress}>9</div>
            <div className="button calc__operator" onClick={this.handleButtonPress}>*</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.handleButtonPress}>4</div>
            <div className="button calc__num" onClick={this.handleButtonPress}>5</div>
            <div className="button calc__num" onClick={this.handleButtonPress}>6</div>
            <div className="button calc__operator" onClick={this.handleButtonPress}>-</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.handleButtonPress}>1</div>
            <div className="button calc__num" onClick={this.handleButtonPress}>2</div>
            <div className="button calc__num" onClick={this.handleButtonPress}>3</div>
            <div className="button calc__operator" onClick={this.handleButtonPress}>+</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num zero" onClick={this.handleButtonPress}>0</div>
            <div className="button" onClick={this.handleButtonPress}>.</div>
            <div className="button calc__operator" onClick={this.handleButtonPress}>=</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
