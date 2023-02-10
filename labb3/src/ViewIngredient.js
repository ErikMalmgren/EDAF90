import React from "react";
import { useParams, Navigate } from "react-router-dom";

function safeFetchJson(url) {
  return fetch(url)
  .then(response => {
    if(!response.ok) {
      throw new Error('${url} returned status ${response.status}');
    }
    return response.json();
    });
  }


function ViewIngredient(props) {

  const { inventory } = props;

  const params = useParams();

  if(!inventory[params.name]) {
    return (
      <div className="container col-12 h-200 p-5 fs-4 mb-4 py-4 bg-light border rounded-3">
        <h2>Ingrediensen finns inte</h2>
      </div>
    );
  }

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