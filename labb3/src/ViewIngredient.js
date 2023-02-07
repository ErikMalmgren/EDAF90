import React from "react";
import { useParams } from "react-router-dom";


function ViewIngredient(props) {
  // const { name } = useParams();
  // let ingredient = Object.keys(props).filter(ing => props[name]);
  // console.log(ingredient.name);

  let { inventory } = props;

  let params = useParams();
  console.log(params.name);

  let ingredientProperties = Object.keys(inventory[params.name]).filter(
    (n) => inventory[params.name][n] === true
  );
  let price = inventory[params.name]["price"];

  console.log(ingredientProperties);
  console.log(price);

  
  return (
    <div>
      pog
    </div>
  );
}

export default ViewIngredient;