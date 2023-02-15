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

//TODO: Lyfta ut gemensam kod från dessa
async function fetchFoundations() {
  const foundations = await safeFetchJson("http://localhost:8080/foundations");
  return (
    await Promise.all(
      foundations.map((foundation) =>
        fetchIngredient("foundations", foundation)
      )
    )
  ).reduce((acc, curr) => {
    const [foundationName] = Object.keys(curr);
    return { ...acc, [foundationName]: curr[foundationName] };
  }, {});
}

async function fetchProteins() {
  const proteins = await safeFetchJson("http://localhost:8080/proteins");
  return (
    await Promise.all(
      proteins.map((protein) => fetchIngredient("proteins", protein))
    )
  ).reduce((acc, curr) => {
    const [proteinName] = Object.keys(curr);
    return { ...acc, [proteinName]: curr[proteinName] };
  }, {});
}

async function fetchExtras() {
  const extras = await safeFetchJson("http://localhost:8080/extras");
  return (
    await Promise.all(extras.map((extra) => fetchIngredient("extras", extra)))
  ).reduce((acc, curr) => {
    const [extraName] = Object.keys(curr);
    return { ...acc, [extraName]: curr[extraName] };
  }, {});
}

async function fetchDressings() {
  const dressings = await safeFetchJson("http://localhost:8080/dressings");
  return (
    await Promise.all(
      dressings.map((dressing) => fetchIngredient("dressings", dressing))
    )
  ).reduce((acc, curr) => {
    const [dressingName] = Object.keys(curr);
    return { ...acc, [dressingName]: curr[dressingName] };
  }, {});
}

//TODO: eventuellt göra reduce här
async function fetchInventory() {
  const foundations = await fetchFoundations();
  const proteins = await fetchProteins();
  const extras = await fetchExtras();
  const dressings = await fetchDressings();
  const combinedInventory = Object.assign(
    foundations,
    proteins,
    extras,
    dressings
  );
  return combinedInventory;
}
//TODO: view-ingredient renderar lite väl ofta
function App(props) {
  const [inventory, setInventory] = useState({});
  const [salads, setSalads] = useState([]);

  useEffect(() => {
    loadShoppingCart();
    async function fetchData() {
      const data = await fetchInventory();
      setInventory(data);
    }
    fetchData();
  }, []);

  const handleSaladSubmit = (salad) => {
    setSalads([...salads, salad]);
    console.log(salads);
    window.localStorage.setItem("shoppingCart", JSON.stringify(salads));
    console.log(JSON.stringify(salads));
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
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
    );
  }

  function Navbar(props) {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Startsida
          </Link>
        </li>
        <li className="nav-item">
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
            element={<h1>Välkommen till Grönt och Skönt</h1>}
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
