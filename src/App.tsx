import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <div className="calc">
          <div className="calc__row display">
            <span className="total">0</span>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__clear">clear</div>
            <div className="button calc__operator">/</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num">7</div>
            <div className="button calc__num">8</div>
            <div className="button calc__num">9</div>
            <div className="button calc__operator">-</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num">4</div>
            <div className="button calc__num">5</div>
            <div className="button calc__num">6</div>
            <div className="button calc__operator">+</div>
          </div>
          <div className="calc__row buttons">
            <div className="button calc__num">1</div>
            <div className="button calc__num">2</div>
            <div className="button calc__num">3</div>
            <div className="button calc__operator">=</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
