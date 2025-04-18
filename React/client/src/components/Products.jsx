import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../App";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { cartId } = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:8081/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error("Błąd podczas pobierania produktów:", error));
  }, []);

  const handleAddToCart = (productId) => {
    if (!cartId) {
      alert("Koszyk nie jest dostępny. Spróbuj odświeżyć stronę.");
      return;
    }

    axios.post(`http://localhost:8081/cart/${cartId}/products`, {
      product_id: productId,
      quantity: 1,
    })
    .then(() => alert("Produkt dodany do koszyka!"))
    .catch(error => console.error("Błąd podczas dodawania produktu do koszyka:", error));
  };

  return (
    <div>
      <h1>Produkty</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price} PLN
            <button onClick={() => handleAddToCart(product.id)}>Dodaj do koszyka</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
