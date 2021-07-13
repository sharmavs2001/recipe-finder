import React, { Component } from "react";
import Axios from "axios";
import "./recipe.css";


import { render } from "react-dom";

// get our fontawesome imports
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
    };
  }

  componentDidMount() {
    console.log(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
        this.props.item
    );
    if (this.props.item === "") alert("Enter a Dish!!");
    else {
      Axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
          this.props.item
      ).then((resolve) => {
        console.log(resolve.data.meals);
        this.setState({
          food: resolve.data.meals,
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      if (this.props.item === "") alert("Enter a Dish!!");
      else {
        Axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
            this.props.item
        ).then((resolve) => {
          console.log(resolve.data.meals);
          this.setState({
            food: resolve.data.meals,
          });
        });
      }
    }
  }


  render() {

    var x=1;
    function changeColor(){
     
      if(x==0) 
        { document.getElementById('font-ico').style.color="black";
      x=1;
      }

        else
        {document.getElementById('font-ico').style.color="red";
              x=0;}
          
    }

    const { food } = this.state;
    if (food !== null && food.length > 0) {
      var ingredientsList = [];
      let i = 1;

      while (food[0]["strIngredient" + i] !== "") {
        ingredientsList.push(
          <li key={i}>
            {food[0]["strIngredient" + i] + "----" + food[0]["strMeasure" + i]}
          </li>
        );
        i++;
      }
      console.log(ingredientsList);
    }
      
    const id =
    food !== null && food.length > 0 ? (
        <div className="recipe-content">
          <div className="food-title">
            <h1>{food[0].strMeal} <span > <FontAwesomeIcon icon={faHeart} id="font-ico" onClick={changeColor}/> </span> </h1>
       
             </div>
          <div className="recipe-text">
            <img class="food-img" src={food[0].strMealThumb}   alt={"Your meal for " + food[0].strMeal}  />
            <div class="recipe-ingredients">
            
              <p>
                <em>Category of Meal - </em> {food[0].strCategory}{" "}
              </p>
              <p>
                <em>Area of the Meal - </em> {food[0].strArea}{" "}
              </p>
              <br/>
              <p><em>Ingredients</em></p>
              <ul className="all-ingredients">{ingredientsList}</ul>
              <p id="rec" >Recipes</p>
              <div className="full-recipe">{food[0].strInstructions}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="noData">No Data Has been recieved</div>
      );
    return <div>{id}</div>;
  }
}

export default Recipe;
