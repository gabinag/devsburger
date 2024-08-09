import apiDevsBurger from '../../services/apiDevsBurger';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './ListaProdutos.module.css';
import { Banner } from '../../components/Banner/Banner';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Produto } from '../../components/Produto/Produto';
import imgBurger from '../../assets/images/burger-home.png';

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
    document.querySelector(`.${styles.listaProdutos}`).scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);


  return (
    <>
      <Header/>
      <Banner/>
      <div className={styles.listaProdutos}>
        <section className={styles.navProdutos}>
            <ul>
              <li onClick={() => handleCategoryClick("HAMBURGUERES")} className={selectedCategory === "HAMBURGUERES" ? styles.selected : ''}>Hambúrgueres</li>
              <li onClick={() => handleCategoryClick("COMBOS")} className={selectedCategory === "COMBOS" ? styles.selected : ''}>Combos</li>
              <li onClick={() => handleCategoryClick("ACOMPANHAMENTOS")} className={selectedCategory === "ACOMPANHAMENTOS" ? styles.selected : ''}>Acompanhamentos</li>
              <li onClick={() => handleCategoryClick("BEBIDAS")} className={selectedCategory === "BEBIDAS" ? styles.selected : ''}>Bebidas</li>
            </ul>
        </section>
        <section className={styles.loadProdutos}>
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
        </section>
        <section className={styles.infoBottom}>
          <div className={styles.infoWrapper}>
            <img src={imgBurger} className={styles.imgBurger} alt="Hambúrguer ilustrativo" />
            <div>
              <div className={styles.infoItem}>
                <p>Aceitamos Pix, Cartão, VR e Dinheiro</p>
              </div>
              <div className={styles.infoItem}>
                <p>Pedidos Online e sem necessidade de cadastro</p>
              </div>
              <div className={styles.infoItem}>
                <p>Delivery e Retirada no Local</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  )
}
