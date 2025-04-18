import React, { useState } from "react";
import axios from "axios";

const Payments = () => {
  const [form, setForm] = useState({
    cart_id: "",
    amount: "",
    method: "card"
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
  
    axios.post("http://localhost:8081/payments", {
      cart_id: parseInt(form.cart_id),
      amount: parseFloat(form.amount),
      method: form.method
    })
    .then(res => {
      alert("Płatność wysłana!");
    })
    .catch(err => {
      console.error("Błąd przy płatności:", err);
    });
  };
  

  return (
    <div>
      <h2>Płatności</h2>
      <form onSubmit={handleSubmit}>

        <select name="method" onChange={handleChange} value={form.method}>
          <option value="card">Karta</option>
          <option value="blik">BLIK</option>
          <option value="transfer">Przelew</option>
        </select>
        <button type="submit">Wyślij płatność</button>
      </form>
    </div>
  );
};

export default Payments;
