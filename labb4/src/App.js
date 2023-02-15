import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ViewIngredient from "./ViewIngredient";
import Salad from "./Salad";

function safeFetchJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
}

async function fetchIngredient(props, name) {
  return await safeFetchJson(`http://localhost:8080/${props}/${name}`).then(
    (ingredient) => {
      return { [name]: ingredient };
    }
  );
}

async function fetchInventory(property) {
  const ingredients = await safeFetchJson(`http://localhost:8080/${property}`);
  return (
    await Promise.all(
      ingredients.map((name) => fetchIngredient(property, name))
    )
  ).reduce((acc, curr) => {
    const [ingredientName] = Object.keys(curr);
    return { ...acc, [ingredientName]: curr[ingredientName] };
  }, {});
}

async function fetchAll() {
  const foundations = await fetchInventory("foundations");
  const proteins = await fetchInventory("proteins");
  const extras = await fetchInventory("extras");
  const dressings = await fetchInventory("dressings");
  const combinedInventory = Object.assign(
    foundations,
    proteins,
    extras,
    dressings
  );
  return combinedInventory;
}

function App(props) {
  const [inventory, setInventory] = useState({});
  const [salads, setSalads] = useState([]);

  useEffect(() => {
    loadShoppingCart();
    async function fetchData() {
      const data = await fetchAll();
      setInventory(data);
      console.log("pog");
    }
    fetchData();
  }, []);

  const handleSaladSubmit = (salad) => {
    window.localStorage.setItem(
      "shoppingCart",
      JSON.stringify([...salads, salad])
    );
    setSalads([...salads, salad]);
  };

  const loadShoppingCart = () => {
    const saladsFromStorage = Salad.parseSaladsFromStorage();
    setSalads(saladsFromStorage);
  };

  const emptySalads = () => {
    setSalads([]);
    window.localStorage.removeItem("shoppingCart");
  };

  function Header() {
    return (
      <header className="p-3 pb-2 mb-1 border-bottom">
        <span className="fs-3">Grönt och skönt</span>
      </header>
    );
  }

  function Navbar(props) {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item pb-1">
          <Link className="nav-link" to="/">
            Startsida
          </Link>
        </li>
        <li className="nav-item pb-1">
          <Link className="nav-link" to="/compose-salad">
            Komponera en sallad
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/view-order">
            Se kundvagn
          </Link>
        </li>
      </ul>
    );
  }

  function PageContent(props) {
    return (
      <div className="container py-4">
        {<Header />}
        {<Navbar />}
        <Routes>
          <Route
            path="/compose-salad"
            element={
              <ComposeSalad
                inventory={inventory}
                onSaladSubmit={handleSaladSubmit}
              />
            }
          ></Route>
          <Route
            path="/view-order"
            element={
              <ViewOrder shoppingCart={salads} emptySalads={emptySalads} />
            }
          ></Route>
          <Route
            path="/"
            element={
              <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ textAlign: "center" }}>
                  Välkommen till Grönt och Skönt
                </h1>
                <img src = "/salad.webp" alt="En riktigt najs salad"></img>
              </div>
            }
          ></Route>
          <Route path="*" element={<h1>Sidan finns inte</h1>}></Route>
          <Route
            path="view-ingredient/:name"
            element={<ViewIngredient inventory={inventory} />}
          ></Route>
          <Route path="success" element={<h1>Orderbekräftelse!</h1>}></Route>
        </Routes>

        {<Footer />}
      </div>
    );
  }

  function Footer(props) {
    return (
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webbprogrammering
      </footer>
    );
  }

  return PageContent(props);
}

export default App;
