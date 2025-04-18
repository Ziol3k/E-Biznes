import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../App";

const Payments = ({ totalValue, refreshCart }) => {
  const { cartId, setCartId } = useContext(CartContext);
  const [method, setMethod] = React.useState("card");

  const handleChange = (e) => {
    setMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cartId) {
      alert("Koszyk nie istnieje. Spróbuj odświeżyć stronę.");
      return;
    }

    axios.post("http://localhost:8081/payments", {
      cart_id: cartId,
      amount: totalValue,
      method: method
    })
    .then((res) => {
      alert("Płatność została pomyślnie zakończona."); 
      const newCartId = res.data.new_cart.id;
      refreshCart(newCartId);
      setCartId(newCartId);
    })
    .catch(err => {
      console.error("Błąd przy płatności:", err);
      alert("Wystąpił błąd podczas realizacji płatności."); 
    });
  };

  return (
    <div>
      <h2>Płatności</h2>
      <form onSubmit={handleSubmit}>
        <select name="method" onChange={handleChange} value={method}>
          <option value="card">Karta</option>
          <option value="blik">BLIK</option>
          <option value="transfer">Przelew</option>
        </select>
        <button type="submit">Zapłać</button>
      </form>
    </div>
  );
};

export default Payments;
