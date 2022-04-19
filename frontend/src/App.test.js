import React from "react";
import { shallow, mount, render } from "enzyme";
import Home from './pages/Home'
import Enzyme from 'enzyme';
import App from "./App";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });


describe('App Component', () => {
  it('should render correctly', () => {
    const component = shallow(<BrowserRouter> <App /></BrowserRouter>);
  
    expect(component).toMatchSnapshot();
  });
});

// it("renders without crashing", () => {
//   shallow(<App />);
// });


// it("renders landing page", () => {
//   const wrapper = shallow(<App />);
//   // expect(wrapper.contains(welcome)).toBe(true);
//   expect(wrapper.contains(Home)).toEqual(true);
// });

// it("renders correctly with no error message", () => {
//     const wrapper = mount();
//     expect(wrapper.state("error")).toEqual(null);
//   });

// it("renders welcome message", () => {
//     const wrapper = shallow(<App />);
//     const welcome = <h2>Welcome to React Testing</h2>;
//     // expect(wrapper.contains(welcome)).toBe(true);
//     expect(wrapper.contains(welcome)).toEqual(true);
//   });
