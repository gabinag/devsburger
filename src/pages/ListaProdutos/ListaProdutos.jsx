import apiDevsBurger from '../../services/apiDevsBurger';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './ListaProdutos.module.css';
import { Banner } from '../../components/Banner/Banner';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Produto } from '../../components/Produto/Produto';

export const ListaProdutos = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  useEffect(() => {
    loadProducts();
  }, [])

  async function loadProducts() {
    const response = await apiDevsBurger.get("/products");
    setProducts(response.data);
  }

  const getQuantity = (productId) => {
    const item = cart.find((product) => product.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const scrollToCategory = (category) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <Header/>
      <Banner/>
      <main className={styles.listaProdutos}>
        <h1>Nossos produtos</h1>
        <ul>
          <li onClick={() => scrollToCategory("hamburgueres")}>Hambúrgueres</li>
          <li onClick={() => scrollToCategory("combos")}>Combos</li>
          <li onClick={() => scrollToCategory("acompanhamentos")}>Acompanhamentos</li>
          <li onClick={() => scrollToCategory("bebidas")}>Bebidas</li>
        </ul>
        {products.length === 0 ? (
          <p className={styles.loading}>Carregando produtos...</p>
        ) : (
          <>
            <Produto
              id="hamburgueres"
              title="Hambúrgueres"
              products={products.filter(product => product.category === "HAMBURGUERES")}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              getQuantity={getQuantity}
            />
            <Produto
              id="combos"
              title="Combos"
              products={products.filter(product => product.category === "COMBOS")}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              getQuantity={getQuantity}
            />
            <Produto
              id="acompanhamentos"
              title="Acompanhamentos"
              products={products.filter(product => product.category === "ACOMPANHAMENTOS")}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              getQuantity={getQuantity}
            />
            {/* <Produto
              id="bebidas"
              title="Bebidas"
              products={products.filter(product => product.category === "BEBIDAS")}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              getQuantity={getQuantity}
            /> */}
          </>
        )}
        <button onClick={() => {navigate('/carrinho')}} label="Ir para o carrinho" className={styles.irCarrinho}>({getTotalQuantity()}) Ir para o carrinho</button>
      </main>
      <Footer/>
    </div>
  )
}
