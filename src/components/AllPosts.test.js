/**
 * @jest-environment jsdom
 */

// Import necessary dependencies and extend expect matchers
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";

// Import the component to be tested
import AllPosts from "./AllPosts";

// Test: renders the All Postscomponent
// Unit test/Behavior Test
describe("rendering", () => {
  test("renders the AllPosts component", () => {
    render(<AllPosts />);
    expect(screen.getByText("Search:")).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument(); //testing the same as above, just with regex instead of string matching
  });
  // Test: renders the Button component with correct props
  //   test("the button renders", () => {
  //     const { getByText } = render(<AllPosts />);
  //     const button = getByText("count is 0");
  //     expect(button).toBeInTheDocument();
  //   });
  // });

  // Test: button click increments the count
  // User interaction test
  // describe("User interaction", () => {
  //   test("button click increments the count", () => {
  //     //render app component and finding button
  //     const { getByText } = render(<AllPosts />);
  //     const button = getByText("count is 0");

  //     //simulate a click
  //     fireEvent.click(button);

  //     expect(button.textContent).toBe("count is 1");
  //   });
  //   test("multiple button clicks update the button text", () => {
  //     //render app component and finding button
  //     const { getByText } = render(<AllPosts />);
  //     const button = getByText("count is 0");

  //     //Click 3 times
  //     fireEvent.click(button);
  //     fireEvent.click(button);
  //     fireEvent.click(button);

  //     expect(button.textContent).toBe("count is 3");
  //   });
});
