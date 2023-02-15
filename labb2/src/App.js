import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';

function App() {

  const[salads, setSalads] = useState([]);

  const handleSaladSubmit = (salad) => {
    setSalads([...salads, salad]);
  }
  
  return (
  <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Grönt och skönt</span>
    </header>
    
    {<ViewOrder shoppingCart={salads} />} 
    {<ComposeSalad inventory={inventory} onSaladSubmit={handleSaladSubmit}/>}

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webbprogrammering
    </footer>
  </div>
  );
  }

export default App;
