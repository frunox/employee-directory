import React, { Component } from "react";
// import Container from './Container'
import "./style.css";

class SearchButton extends Component {
  state = {
    input: ""
  }

  render() {
    return (
      <div className="inputLine">
        <input
          className="input"
          value={this.state.input}
          name="input"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Search"
        />

      </div >
    );
  };
}

export default SearchButton;
