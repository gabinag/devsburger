import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './Carrinho.module.css';
import { useNavigate } from 'react-router-dom';
import { Botao } from '../../components/Botao/Botao';

export const Carrinho = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart } = useContext(CartContext);

  const calculaPrecoTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={styles.carrinho}>
      {cart.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <section>
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
        </section>
      )}
      <div className={styles.wrapContainer}>
        <p>Total: R${calculaPrecoTotal().toFixed(2)}</p>
        <label htmlFor="obs">Observações:</label>
        <textarea name="obs" id="obs" placeholder='Alguma observação? Ex.: Sem cebola, sem picles...'></textarea>
        <div className={styles.wrapBtn}>
          <Botao onClick={() => navigate('/')} label="Voltar"/>
          <Botao onClick={() => navigate('/dados')} label="Prosseguir"/>
        </div>
      </div>
    </div>
  );
};
