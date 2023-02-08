import { useState } from 'react';
import Salad from './Salad.js';
import { useNavigate, Link } from 'react-router-dom';

function ComposeSalad(props) {
  
  // använd usememo istället
  const navigate = useNavigate();
  const foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta'); 
  
  const proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const [protein, setProtein] = useState('Kycklingfilé');
  
  const extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true});

  const dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [dressing, setDressing] = useState('Ceasardressing'); 

  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setExtra(oldState => {
      const newState = { ...oldState };
      newState[name] = checked;
      return newState;
    });
  };  

  const handleChange = event => {
    console.log(event.target);
    console.log(event.target.props);
    console.log(event.target.value);
    console.log(event.target.name);
  
    setFoundation(event.target.value);
    // switch (name) {
    //   case 'foundation':
    //     setFoundation(value);
    //     break;
    //   case 'protein':
    //     setProtein(value);
    //     break;
    //   case 'dressing':
    //     setDressing(value);
    //     break;
    //   default:
    //     break;
    // }
    event.target.parentElement.classList.add("was-validated");
  }

  const handleSubmit = event => {
    event.preventDefault();
    event.target.classList.add("was-validated");
    if(!event.target.checkValidity()) {
      return;
    }
    
    const extras = Object.keys(extra).filter((n) => extra[n]);
    const ingredients = [foundation, protein, ...extras, dressing];
    const salad = new Salad();

    ingredients.forEach((ingredient) => salad.add(ingredient, props.inventory[ingredient]));
    resetSalad();
    props.onSaladSubmit(salad);
    navigate("/view-order");

  }

  const resetSalad = function () {
    setFoundation('Pasta');
    setProtein('Kycklingfilé');
    setExtra({});
    setDressing('Ceasardressing');
  }
  
  return (
    // Problem med required och valid-feedback "borde" funka men säkert ett litet fel någonstans
    <div className="container col-12">
    <form onSubmit={handleSubmit} noValidate>
    <div className="row h-200 p-5 bg-light border rounded-3">

      <h2>Välj bas</h2>
        <div>
        <select required name={foundation} onChange={e => {setFoundation(e.target.value); e.target.parentElement.classList.add("was-validated");}}>
          <option hidden value = "">Välj en bas!</option>
            {foundations.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
          <div className="valid-feedback"> Bra val!</div> 
          <div className="invalid-feedback"> Du måste välja en salladsbas!</div> 
        </div>

      <h2>Välj protein</h2>
        <div> 
          <select required name={protein} onChange={e => {setProtein(e.target.value); e.target.parentElement.classList.add("was-validated");}}>
          <option hidden value = "">Välj ett protein!</option>
            {proteins.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
          <div className="valid-feedback"> Bra val!</div> 
          <div className="invalid-feedback"> Du måste välja ett protein!</div> 
        </div>

      <h2>Välj tillbehör</h2>

        {extras.map((item, index) => (
           <div key={index} className="col-3 p-2 fs-6">
           <input value={item} type="checkbox" onChange={handleCheckboxChange} name={item} checked={!!extra[item]} style={{ marginRight: "5px" }} />
           <Link 
            to={`/view-ingredient/${item}`}
            style={{textDecoration: "none"}}>
            {item}
            </Link>
         </div>
        ))}

      <h2>Välj dressing</h2>

        <div>
          <select required name={dressing} onChange= {e => {setDressing(e.target.value); e.target.parentElement.classList.add("was-validated");}}>
          <option hidden value = "">Välj en dressing!</option>
            {dressings.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
          <div className="valid-feedback"> Bra val!</div> 
          <div className="invalid-feedback"> Du måste välja en dressing!</div> 
        </div>

        <div class = "btn-group">
          <button type="submit" className="btn btn-primary border rounded-3">Beställ</button> 
          <button type="reset" className="btn btn-primary border rounded-3" onClick={resetSalad}>Återställ</button>
        </div>
    </div>
  </form>
</div>

  );
}
export default ComposeSalad;
