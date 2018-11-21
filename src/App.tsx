import * as React from 'react';
import { AppState } from './definitions';
import './App.css';

class App extends React.Component {

  constructor(props: Object) {
    super(props);
    this.numButtonPress = this.numButtonPress.bind(this);
    this.clearButtonPress = this.clearButtonPress.bind(this);
  }

  state: AppState = {
    displayValue: '0',
    total: 0,
  };

  numButtonPress(e: React.SyntheticEvent) {
    const state: AppState = Object.assign({}, this.state);
    const buttonValue: string = e.currentTarget.textContent ?
        e.currentTarget.textContent : '';
    state.displayValue = state.displayValue === '0' ?
        buttonValue :
        state.displayValue += buttonValue;
    this.setState(state);
  }

  clearButtonPress(e: React.SyntheticEvent) {
    e.preventDefault();

    const state = Object.assign({}, this.state);
    state.total = 0;
    state.displayValue = '0';
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
            <div className="button calc__operator">/</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.numButtonPress}>7</div>
            <div className="button calc__num" onClick={this.numButtonPress}>8</div>
            <div className="button calc__num" onClick={this.numButtonPress}>9</div>
            <div className="button calc__operator">x</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.numButtonPress}>4</div>
            <div className="button calc__num" onClick={this.numButtonPress}>5</div>
            <div className="button calc__num" onClick={this.numButtonPress}>6</div>
            <div className="button calc__operator">-</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num" onClick={this.numButtonPress}>1</div>
            <div className="button calc__num" onClick={this.numButtonPress}>2</div>
            <div className="button calc__num" onClick={this.numButtonPress}>3</div>
            <div className="button calc__operator">+</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num zero" onClick={this.numButtonPress}>0</div>
            <div className="button" onClick={this.numButtonPress}>.</div>
            <div className="button calc__operator">=</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
