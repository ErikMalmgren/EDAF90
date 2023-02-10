import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ViewIngredient from './ViewIngredient';

function safeFetchJson(url) {
  return fetch(url)
  .then(response => {
    if(!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
    });
  }

async function fetchIngredient(props, name) {
  return await safeFetchJson(`http://localhost:8080/${props}/${name}`)
    .then(ingredient => {
      return { [name]: ingredient };
    });
}
  

// async function fetchIngredient(props, name) {
//   return await safeFetchJson(`http://localhost:8080/${props}/${name}`);
// }

async function fetchFoundations() {
  const foundations =  await safeFetchJson('http://localhost:8080/foundations');
  return await Promise.all((foundations.map(foundation => fetchIngredient("foundations", foundation))));
}

async function fetchProteins() {
  const proteins = await safeFetchJson('http://localhost:8080/proteins');
  return await Promise.all((proteins.map(protein => fetchIngredient("proteins", protein))));
}

async function fetchExtras() {
  const extras = await safeFetchJson('http://localhost:8080/extras');
  return await Promise.all((extras.map(extra => fetchIngredient("extras", extra))));
}

async function fetchDressings() {
  const dressings = await safeFetchJson('http://localhost:8080/dressings');
  return await Promise.all((dressings.map(dressing => fetchIngredient("dressings", dressing))));
}

async function fetchInventory() {
  const foundations = await fetchFoundations();
  console.log(foundations);
  const proteins = await fetchProteins();
  const extras = await fetchExtras();
  const dressings = await fetchDressings();
  const inventory = {
    foundations: {},
    proteins: {},
    extras: {},
    dressings: {}
  };
  foundations.forEach(foundation => inventory.foundations[foundation.name] = foundation);
  proteins.forEach(protein => inventory.proteins[protein.name] = protein);
  extras.forEach(extra => inventory.extras[extra.name] = extra);
  dressings.forEach(dressing => inventory.dressings[dressing.name] = dressing);
  return inventory;
}


function App(props) {
  const [inventory, setInventory] = useState({});
  
  useEffect(() => {
    async function fetchData() {
      const data = await fetchInventory();
      setInventory(data);
    }
  fetchData();
  }, []);

  console.log(inventory);
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
      <li className = "nav-item">
        <Link className="nav-link" to="/">
          Startsida
        </Link> 
      </li>
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
                <Routes>
                  <Route 
                    path="/compose-salad" 
                    element = {<ComposeSalad inventory={inventory} onSaladSubmit={handleSaladSubmit}/>}> 
                  </Route>
                  <Route
                    path="/view-order"
                    element = {<ViewOrder shoppingCart={salads} />} >
                  </Route>
                  <Route
                    path="/"
                    element = {<h1>Välkommen till Grönt och Skönt</h1>}>
                  </Route>
                  <Route
                    path="*"
                    element={<h1>Sidan finns inte</h1>}>
                  </Route>
                  <Route
                  path = "view-ingredient/:name"
                  element = {<ViewIngredient inventory={inventory}/>}>  
                  </Route>
                </Routes>
                
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


