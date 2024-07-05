import apiDevsBurger from '../../services/apiDevsBurger';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './ListaProdutos.module.css';
import { Banner } from '../../components/Banner/Banner';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

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

  return (
    <div>
      <Header/>
      <Banner/>
      <div className={styles.listaProdutos}>
          {products.length === 0 ? (
            <p className={styles.loading}>Carregando produtos...</p>
          ) : (
              <section className={styles.wrapCards}>
              {products.map((product) => (
                <div className={styles.card} key={product.id}>
                  <img src={product.image} alt=""/>
                  <h3>{product.name}</h3>
                  <p className={styles.desc}>{product.description}</p>
                  <div className={styles.wrapFlex}>
                    <p>R${product.price}</p>
                    <div className={styles.wrapQtd}>
                      <button onClick={() => removeFromCart(product.id)}>-</button>
                      <p>{getQuantity(product.id)}</p>
                      <button onClick={() => addToCart(product)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
              </section>
          )}
          <button onClick={() => {navigate('/carrinho')}} label="Ir para o carrinho" className={styles.irCarrinho}>({getTotalQuantity()}) Ir para o carrinho</button>
      </div>
      <Footer/>
    </div>
  )
}
