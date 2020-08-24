import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      showError: false,
    };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement = () => {
    if (this.state.showError) {
      this.setState({ ...this.state, showError: false });
    } else {
      this.setState({ ...this.state, counter: this.state.counter + 1 });
    }
  };

  handleDecrement = () => {
    if (this.state.counter === 0) {
      this.setState({ ...this.state, showError: true });
    } else {
      this.setState({ ...this.state, counter: this.state.counter - 1 });
    }
  };

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently: {this.state.counter}
        </h1>
        {this.state.showError && (
          <p data-test="error-message" style={{ color: 'red' }}>
            Error: counter should not be less than 0
          </p>
        )}
        <button data-test="increment-button" onClick={this.handleIncrement}>
          Increment
        </button>
        <button data-test="decrement-button" onClick={this.handleDecrement}>
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
