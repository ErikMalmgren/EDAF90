import React from 'react';


function ViewOrder(props) {
  const { shoppingCart } = props;

  return (
    <div className="container col-12 h-200 p-5 fs-4 mb-4 py-4 bg-light border rounded-3">
      <h2>Beställningen</h2>
      {shoppingCart.map(salad => (
        <div key={salad.uuid}> {Object.keys(salad.ingredients).join(', ')} , pris: {salad.getPrice()} kr</div>
        ))}
    </div>
  );
}


export default ViewOrder;
