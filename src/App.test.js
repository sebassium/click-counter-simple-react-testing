import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 *Factory function to create a ShallowWrapper for the App component.
 *@function setup
 *@param {object} props - Component props specific to this setup.
 *@param {object} state - Initial state for setup.
 *@returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value for data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders incremet button', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  expect(incrementButton.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter stars at cero', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counting display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking button decrements counting display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('stop decrementing counter when it gets to cero', () => {
  const wrapper = setup();

  // find button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(0);
});

test("don't show error if it's not needed", () => {
  const wrapper = setup();
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
});

test('show an error when trying to decrement counter below 0', () => {
  const wrapper = setup();

  // find button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // Error display should appear
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(1);
});

test('disappear error when incrementing count from 0', () => {
  const wrapper = setup();

  // find button and click to decrement and show error
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // find button and click to increment
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  // Error display should desappear
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
});

// describe('counter is 0 and decrement is clicked', () => {
//   // using a describe here so I can use a "beforeEach" for shared setup

//   // scoping wrapper to the describe, so it can be used in beforeEach and the tests
//   let wrapper
//   beforeEach(() => {
//     // no need to set counter value here; default value of 0 is good
//     wrapper = setup();

//     // find button and click
//     const button = findByTestAttr(wrapper, 'decrement-button');
//     button.simulate('click');
//     wrapper.update();
//   });
//   test('error shows', () => {
//     // check the class of the error message
//     const errorDiv = findByTestAttr(wrapper, 'error-message');
//     const errorHasHiddenClass = errorDiv.hasClass('hidden');
//     expect(errorHasHiddenClass).toBe(false);
//   });
//   test('counter still displays 0', () => {
//     const counterDisplay = findByTestAttr(wrapper, 'counter-display');
//     expect(counterDisplay.text()).toContain(0);
//   });
//   test('clicking increment clears the error', () => {
//     // find and click the increment button
//     const button = findByTestAttr(wrapper, 'increment-button');
//     button.simulate('click');

//     // check the class of the error message
//     const errorDiv = findByTestAttr(wrapper, 'error-message');
//     const errorHasHiddenClass = errorDiv.hasClass('hidden');
//     expect(errorHasHiddenClass).toBe(true);
//   });
// });
