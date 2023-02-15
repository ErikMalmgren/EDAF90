import React, { useState } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

function ViewOrder(props) {
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({});

  const handleOrder = async (event) => {
    const salads = props.shoppingCart.map((salad) =>
      Object.keys(salad.ingredients)
    );

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(salads),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/orders/",
        postOptions
      );
      const data = await response.json();
      setToastData(data);
      setShowToast(true);
      props.emptySalads();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container col-12 h-200 p-5 fs-4 mb-4 py-4 bg-light border rounded-3">
      <h2>Beställningen</h2>
      {props.shoppingCart.map((salad) => (
        <div key={salad.uuid}>
          {" "}
          {Object.keys(salad.ingredients).join(", ")} , pris: {salad.getPrice()}{" "}
          kr
        </div>
      ))}
      <hr />
      <form></form>
      <button className="btn btn-primary mt-3" onClick={handleOrder}>
        Lägg Beställning
      </button>
      <div style={{ position: "fixed", top: "35%", right: "50%" }}>
        <Toast isOpen={showToast} style={{ width: "400px" }}>
          <ToastHeader> Beställning </ToastHeader>
          <ToastBody>
            {" "}
            Beställningen är mottagen! Ordernummer: {toastData.uuid}. pris:{" "}
            {toastData.price} kr.{" "}
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
}

export default ViewOrder;
