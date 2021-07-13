import React, { Component } from "react";
import "./Header.css";
import Recipe from "./Recipe";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: false,
      item: "",
    };
  }

  getRecipe = (e) => {
    e.preventDefault();

    var item = document.getElementById("text").value;

    this.setState({
      found: true,
      item: item,
    });
  };

  render() {
    return (
      <div>
        <div className="header-content">
          <h1 className="title">Recipe Finder</h1>
          <form className="input-content">
            <input class="search-bar" type="text" placeholder="Enter the Name of the Dish" id="text" />
            <input class="get-btn" type="submit" value="Get Ingredients" onClick={this.getRecipe} />
          </form>
        </div>
        {this.state.found ? (
          <Recipe item={this.state.item} />
        ) : (
          <h2 className="bottom-text">
            Type a Dish Name to Search for it's ingredient
          </h2>
        )}
      </div>
    );
  }
}
export default Header;
