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
      <div className={styles.carrinho}>
        <h1>Carrinho</h1>
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio, volte em <Link to="/">Produtos</Link></p>
        ) : (
          <section>
            <div className={styles.wrapCards}>
              {cart.map((product) => (
                <div className={styles.card} key={product.id}>
                  <img src={product.image} alt=""/>
                  <div>
                      <p>{product.name}</p>
                      <div className={styles.wrapFlex}>
                          <p>R${product.price}</p>
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
            <p className={styles.wrapFlexEnd}>Total: R${calculaPrecoTotal().toFixed(2)}</p>
            <div className={styles.wrapTextArea}>
              <label htmlFor="obs">Observações:</label>
              <textarea name="obs" id="obs" placeholder='Alguma observação? Ex.: Sem cebola, sem picles...' onChange={handleObservacaoChange}></textarea>
            </div>
            <div className={styles.wrapFlexEnd}>
              <Botao onClick={() => navigate('/')} label="Voltar"/>
              <Botao onClick={() => navigate('/dados')} label="Prosseguir"/>
            </div>
          </section>
          )}
        </div>
      
      <Footer/>
    </>
  );
};
