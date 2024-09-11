import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './Carrinho.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { Botao } from '../../components/Botao/Botao';
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'

export const Carrinho = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart } = useContext(CartContext);

  const calculaPrecoTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleObservacaoChange = (e) => {
    const observation = e.target.value;
    localStorage.setItem('observation', observation);
  };

  return (
    <>
      <Header/>
      <div className='bgPassosPedido'>
        <div className={styles.carrinho}>
          <h1 className='containerTitle'>Carrinho</h1>
          {cart.length === 0 ? (
            <p className={styles.vazio}>Seu carrinho está vazio, volte em <Link to="/" className={styles.linkVazio}>Produtos</Link> e selecione "Adicionar" no item que deseja.</p>
          ) : (
            <section className={styles.wrapGrid}>
              <div className={styles.wrapProdutos}>
                {cart.map((product) => (
                  <div className={styles.card} key={product.id}>
                    <img src={product.image} alt=""/>
                    <div>
                      <div className={styles.wrapTitle}>
                        <h3>{product.name}</h3>
                        <p>R${product.price}</p>
                      </div>
                      <div className={styles.wrapDesc}>
                        <p className={styles.desc}>{product.description}</p>
                        <div className={styles.wrapQtd}>
                          <button onClick={() => removeFromCart(product.id)}>-</button>
                          <p>{product.quantity}</p>
                          <button onClick={() => addToCart(product)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className={styles.wrapTextArea}>
                  <label htmlFor="obs">Observações:</label>
                  <textarea name="obs" id="obs" placeholder='Alguma observação? Ex.: Sem cebola, sem picles...' onChange={handleObservacaoChange}></textarea>
                </div>
                <p className={`${styles.wrapFlexEnd} ${styles.total}`}>Valor total: R${calculaPrecoTotal().toFixed(2)}</p>
                <div className={styles.wrapFlexEnd}>
                  <Botao onClick={() => navigate('/')} label="Voltar"/>
                  <Botao onClick={() => navigate('/dados')} label="Prosseguir" backgroundColor="var(--laranja)"/>
                </div>
              </div>
            </section>
            )}
        </div>
      </div>
      <Footer/>
    </>
  );
};
