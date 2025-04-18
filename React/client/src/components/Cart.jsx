import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../App";
import Payments from "./Payments";

const Cart = () => {
  const { cartId, setCartId } = useContext(CartContext);
  const [cart, setCart] = useState({ products: [], totalValue: 0 });

  const refreshCart = (newCartId) => {
    setCartId(newCartId);
    axios.get(`http://localhost:8081/cart/${newCartId}`)
      .then(response => {
        setCart({
          ...response.data,
          totalValue: Number(response.data.total_value) || 0
        });
      })
      .catch(error => console.error("Błąd podczas odświeżania koszyka:", error));
  };

  useEffect(() => {
    if (cartId) {
      axios.get(`http://localhost:8081/cart/${cartId}`)
        .then(response => {
          setCart({
            ...response.data,
            totalValue: Number(response.data.total_value) || 0
          });
        })
        .catch(error => console.error("Błąd podczas pobierania koszyka:", error));
    }
  }, [cartId]);

  const handleRemoveProduct = (productId) => {
    axios.delete(`http://localhost:8081/cart/${cartId}/products/${productId}`)
      .then(() => {
        axios.get(`http://localhost:8081/cart/${cartId}`)
          .then(response => {
            setCart({
              ...response.data,
              totalValue: Number(response.data.total_value) || 0
            });
          });
      })
      .catch(error => console.error("Błąd podczas usuwania produktu z koszyka:", error));
  };

  return (
    <div>
      <h1>Koszyk</h1>
      {cartId ? (
        <>
          <ul>
            {cart.products.map(product => (
              <li key={product.product_id}>
                {product.product?.name || "Nieznany produkt"} - {product.product?.price ? product.product.price.toFixed(2) : "0.00"} PLN x {product.quantity || 1}
                <button onClick={() => handleRemoveProduct(product.product_id)}>Usuń</button>
              </li>
            ))}
          </ul>
          <h3>Suma: {typeof cart.totalValue === 'number' ? cart.totalValue.toFixed(2) : "0.00"} PLN</h3>
          <Payments cartId={cartId} totalValue={cart.totalValue} refreshCart={refreshCart} />
        </>
      ) : (
        <p>Ładowanie koszyka...</p>
      )}
    </div>
  );
};

export default Cart;
