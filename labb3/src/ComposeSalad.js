import { useState, useMemo } from "react";
import Salad from "./Salad.js";
import { useNavigate, Link } from "react-router-dom";

function ComposeSalad(props) {
  // använd usememo istället
  const navigate = useNavigate();

  const foundations = useMemo(() => {
    return Object.keys(props.inventory).filter(
      (name) => props.inventory[name].foundation
    );
  }, [props.inventory]);

  const [foundation, setFoundation] = useState("Pasta");

  const proteins = useMemo(() => {
    return Object.keys(props.inventory).filter(
      (name) => props.inventory[name].protein
    );
  }, [props.inventory]);

  const [protein, setProtein] = useState("Kycklingfilé");

  const extras = useMemo(() => {
    return Object.keys(props.inventory).filter(
      (name) => props.inventory[name].extra
    );
  }, [props.inventory]);

  const [extra, setExtra] = useState({ Bacon: true, Fetaost: true });

  const dressings = useMemo(() => {
    return Object.keys(props.inventory).filter(
      (name) => props.inventory[name].dressing
    );
  }, [props.inventory]);

  const [dressing, setDressing] = useState("Ceasardressing");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setExtra((oldState) => {
      const newState = { ...oldState };
      newState[name] = checked;
      return newState;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.classList.add("was-validated");
    // if(!event.target.checkValidity()) { //behövs inte när required används
    //   return;
    // }

    const extras = Object.keys(extra).filter((n) => extra[n]);
    const ingredients = [foundation, protein, ...extras, dressing];
    const salad = new Salad();

    ingredients.forEach((ingredient) =>
      salad.add(ingredient, props.inventory[ingredient])
    );
    resetSalad();
    props.onSaladSubmit(salad);
    navigate("/view-order");
  };

  const resetSalad = function () {
    setFoundation("Pasta");
    setProtein("Kycklingfilé");
    setExtra({});
    setDressing("Ceasardressing");
  };

  return (
    <div className="container col-12">
      <form onSubmit={handleSubmit} noValidate>
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Välj bas</h2>
          <div>
            <select
              required
              name={foundation}
              value={foundation}
              onChange={(e) => {
                setFoundation(e.target.value);
                e.target.parentElement.classList.add("was-validated");
              }}
            >
              <option hidden value="">
                Välj en bas!
              </option>
              {foundations.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="valid-feedback"> Bra val!</div>
            <div className="invalid-feedback">
              {" "}
              Du måste välja en salladsbas!
            </div>
          </div>

          <h2>Välj protein</h2>
          <div>
            <select
              required
              name={protein}
              value={protein}
              onChange={(e) => {
                setProtein(e.target.value);
                e.target.parentElement.classList.add("was-validated");
              }}
            >
              <option hidden value="">
                Välj ett protein!
              </option>
              {proteins.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="valid-feedback"> Bra val!</div>
            <div className="invalid-feedback"> Du måste välja ett protein!</div>
          </div>

          <h2>Välj tillbehör</h2>
          {extras.map((item, index) => (
            <div key={index} className="col-3 p-2 fs-6">
              <input
                value={item}
                type="checkbox"
                onChange={handleCheckboxChange}
                name={item}
                checked={!!extra[item]}
                style={{ marginRight: "5px" }}
              />
              <Link
                to={`/view-ingredient/${item}`}
                style={{ textDecoration: "none" }}
              >
                {item}
              </Link>
            </div>
          ))}

          <h2>Välj dressing</h2>

          <div>
            <select
              required
              name={dressing}
              value={dressing}
              onChange={(e) => {
                setDressing(e.target.value);
                e.target.parentElement.classList.add("was-validated");
              }}
            >
              <option hidden value="">
                Välj en dressing!
              </option>
              {dressings.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="valid-feedback"> Bra val!</div>
            <div className="invalid-feedback"> Du måste välja en dressing!</div>
          </div>

          <div class="btn-group">
            <button type="submit" className="btn btn-primary border rounded-3">
              Beställ
            </button>
            <button
              type="reset"
              className="btn btn-primary border rounded-3"
              onClick={resetSalad}
            >
              Återställ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ComposeSalad;
