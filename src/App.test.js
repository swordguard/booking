import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from './App';
import {Sessions} from './components/Sessions'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Book a wellness session./i);
  expect(linkElement).toBeInTheDocument();
});


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render a Session", () => {
  const props = {
    state: {},
    dispatch: jest.mock(),
    scheduleAnotherState: {}
  }
  act(() => {
    render(<Sessions {...props}/>, container);
  });

  expect(
    container.innerHTML
  ).toMatchSnapshot();

});
