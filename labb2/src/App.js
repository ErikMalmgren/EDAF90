import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import { useState } from 'react';

let cart = [];

function App() {

  const[salads, setSalads] = useState([]);

  const handleSaladSubmit = (salad) => {
    let newSalad = {...salad};
    cart.push(newSalad);
    setSalads([...salads, newSalad]);
    console.log("PASSED UP");
    console.log(cart[0]);
  }
  return (
  <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
    <div className="cart-container">
    <h2>Cart</h2>
      {cart.map((item, index) => (<li key={index}>{item.name}</li>))}
  </div>


    {<ComposeSalad inventory={inventory} onSaladSubmit={handleSaladSubmit}/>}

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webbprogrammering
    </footer>
  </div>
  );
  }

export default App;
