import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';
import Salad from './Salad';

let cart = [];

function App() {

  const[salads, setSalads] = useState([]);

  const handleSaladSubmit = (salad) => {
    let newSalad = new Salad(salad);
    cart.push(newSalad);
    setSalads([...salads, newSalad]);
    console.log(newSalad instanceof Salad);
  }
  
  return (
  <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
    
    {<ViewOrder shoppingCart={cart} />} 
    {<ComposeSalad inventory={inventory} onSaladSubmit={handleSaladSubmit}/>}

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webbprogrammering
    </footer>
  </div>
  );
  }

export default App;
