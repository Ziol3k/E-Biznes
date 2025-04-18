import React from "react";
import Products from "./components/Products";
import Payments from "./components/Payments";

function App() {
  return (
    <div className="App">
      <h1>Sklep Internetowy</h1>
      <Products />
      <Payments />
    </div>
  );
}

export default App;
