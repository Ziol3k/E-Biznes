import React, { useEffect, createContext, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import axios from "axios";

export const CartContext = createContext();

function App() {
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    if (!cartId) {
      axios.post("http://localhost:8081/cart")
        .then(response => {
          setCartId(response.data.id);
        })
        .catch(error => console.error("Błąd podczas tworzenia koszyka:", error));
    }
  }, [cartId]);

  const contextValue = useMemo(() => ({ cartId, setCartId }), [cartId, setCartId]);

  return (
    <CartContext.Provider value={contextValue}>
      <Router>
        <div className="App">
          <h1>Sklep Internetowy</h1>
          <nav>
            <Link to="/">Produkty</Link> | <Link to="/cart">Koszyk</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
