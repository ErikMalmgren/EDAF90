import React from "react";
import { useParams } from "react-router-dom";


function ViewIngredient(props) {
  // const { name } = useParams();
  // let ingredient = Object.keys(props).filter(ing => props[name]);
  // console.log(ingredient.name);

  const { inventory } = props;

  const params = useParams();

  const ingredientProperties = Object.keys(inventory[params.name]).filter(
    (n) => inventory[params.name][n] === true
  );
  const price = inventory[params.name]["price"];
  
  return (
    <div className="container col-12 h-200 p-5 fs-4 mb-4 py-4 bg-light border rounded-3">
      <h2 key = {params.name}> Information om {params.name}: {price} kr {ingredientProperties.map((ingredient) => <div key = {ingredient}>{ingredient}</div>)} </h2>
    </div>
  );
}

export default ViewIngredient;