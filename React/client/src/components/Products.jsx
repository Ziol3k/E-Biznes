import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Błąd podczas pobierania produktów:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Produkty</h1>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price} PLN
            </li>
          ))
        ) : (
          <li>Brak produktów do wyświetlenia</li>
        )}
      </ul>
    </div>
  );
};

export default Products;
