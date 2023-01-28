import React from 'react';

function formatSalads(shoppingCart) {
  return shoppingCart.map(salad => {
    let ingredients = Object.keys(salad.ingredients).join(', ');
    return {
      id: salad.uuid,
      ingredients: ingredients,
      price: salad.getPrice()
    }
  });
}


function ViewOrder(props) {
  const { shoppingCart } = props;

  return (
    <div className="container">
      <h2>Beställningen</h2>
      {shoppingCart.map(salad => (
        <div key={salad.id}> {Object.keys(salad.ingredients).join(', ')} , pris: {salad.getPrice()} kr</div>
        ))}
    </div>
  );
}


export default ViewOrder;
