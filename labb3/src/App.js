import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App(props) {

  const[salads, setSalads] = useState([]);

  const handleSaladSubmit = (salad) => {
    setSalads([...salads, salad]);
  }
  
  function Header() { return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
  )}

  function Navbar(props) {
    return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to="/compose-salad">
          Komponera en sallad
        </Link>
      </li>
      <li className = "nav-item">
        <Link className="nav-link" to="/view-order">
          Se kundvagn
        </Link> 
      </li>
    </ul>);
  }

  function PageContent(props) { 
      return <div className="container py-4">
                {<Header/>}
                {<Navbar/>}
                {<ViewOrder shoppingCart={salads} />} 
                {<ComposeSalad inventory={inventory} onSaladSubmit={handleSaladSubmit}/>}
                {<Footer/>} 
              </div>
      }
            
  function Footer(props) { 
    return <footer className="pt-3 mt-4 text-muted border-top">
              EDAF90 - webbprogrammering
            </footer> 
    }

    return PageContent(props);
} 

export default App;


