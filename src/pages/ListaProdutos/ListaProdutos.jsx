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
  const [selectedCategory, setSelectedCategory] = useState('HAMBURGUERES');
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);


  return (
    <div>
      <Header/>
      <Banner/>
      <main className={styles.listaProdutos}>
        <h1>Nossos produtos</h1>
        <ul>
          <li onClick={() => handleCategoryClick("HAMBURGUERES")}>Hambúrgueres</li>
          <li onClick={() => handleCategoryClick("COMBOS")}>Combos</li>
          <li onClick={() => handleCategoryClick("ACOMPANHAMENTOS")}>Acompanhamentos</li>
          <li onClick={() => handleCategoryClick("BEBIDAS")}>Bebidas</li>
        </ul>
        {filteredProducts.length === 0 ? (
          <p className={styles.loading}>Carregando produtos...</p>
        ) : (
          <Produto
            products={filteredProducts}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            getQuantity={getQuantity}
          />
        )}
        <button onClick={() => {navigate('/carrinho')}} label="Ir para o carrinho" className={styles.irCarrinho}>({getTotalQuantity()}) Ir para o carrinho</button>
      </main>
      <Footer/>
    </div>
  )
}
