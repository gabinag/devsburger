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
import iconBurger from '../../assets/images/icon-hamburguer.png';
import iconCombo from '../../assets/images/icon-combo.png';
import iconAcompanhamento from '../../assets/images/icon-acompanhamento.png';
import iconBebida from '../../assets/images/icon-bebida.png';
import iconCartao from '../../assets/images/icon-cartao.png';
import iconSeta from '../../assets/images/icon-seta.png';
import iconMoto from '../../assets/images/icon-moto.png';

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
              <li onClick={() => handleCategoryClick("HAMBURGUERES")} className={selectedCategory === "HAMBURGUERES" ? styles.selected : ''}>
                <img src={iconBurger} alt="Ícone de hambúrguer" />
                <span>Hambúrgueres</span>
              </li>
              <li onClick={() => handleCategoryClick("COMBOS")} className={selectedCategory === "COMBOS" ? styles.selected : ''}>
                <img src={iconCombo} alt="Ícone de hambúrguer e bebida" />
                <span>Combos</span>
              </li>
              <li onClick={() => handleCategoryClick("ACOMPANHAMENTOS")} className={selectedCategory === "ACOMPANHAMENTOS" ? styles.selected : ''}>
                <img src={iconAcompanhamento} alt="Ícone de batata frita" />
                <span>Acompanhamentos</span>
              </li>
              <li onClick={() => handleCategoryClick("BEBIDAS")} className={selectedCategory === "BEBIDAS" ? styles.selected : ''}>
                <img src={iconBebida} alt="Ícone de bebida" />
                <span>Bebidas</span>
              </li>
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
                <img src={iconCartao} alt="Ícone de cartão" />
                <p>Aceitamos Pix, Cartão, VR e Dinheiro</p>
              </div>
              <div className={styles.infoItem}>
                <img src={iconSeta} alt="Ícone de seta de mouse" />
                <p>Pedidos Online e sem necessidade de cadastro</p>
              </div>
              <div className={styles.infoItem}>
                <img src={iconMoto} alt="Ícone de moto" />
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
