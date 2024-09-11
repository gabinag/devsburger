import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './Pagamento.module.css';
import { Botao } from '../../components/Botao/Botao';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Pagamento = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const savedPaymentMethod = localStorage.getItem('paymentMethod');
    if (savedPaymentMethod) {
      setSelectedPayment(savedPaymentMethod);
    }
  }, []);

  const calculaPrecoTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRadioChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPayment) {
      localStorage.setItem('paymentMethod', selectedPayment);
      navigate('/revisao');
    }
  };

  return (
    <>
      <Header />
      <div className="bgPassosPedido">
        <div className="container">
          <h1 className="containerTitle">Forma de pagamento</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.wrapForm}>
              <div className={styles.wrapOptions}>
                <div className={styles.paymentOption}>
                  <label
                    className={selectedPayment === 'Cartão' ? styles.labelSelected : ''}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cartão"
                      checked={selectedPayment === 'Cartão'}
                      onChange={handleRadioChange}
                      required
                    />
                    Cartão de Crédito
                  </label>
                  <div
                    className={`${styles.messageBox} ${selectedPayment === 'Cartão' ? styles.messageBoxVisible : ''}`}
                  >
                    <p>Bandeiras aceitas: Visa, MasterCard, American Express.</p>
                  </div>
                </div>
                <div className={styles.paymentOption}>
                  <label
                    className={selectedPayment === 'Dinheiro' ? styles.labelSelected : ''}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Dinheiro"
                      checked={selectedPayment === 'Dinheiro'}
                      onChange={handleRadioChange}
                      required
                    />
                    Dinheiro
                  </label>
                  <div
                    className={`${styles.messageBox} ${selectedPayment === 'Dinheiro' ? styles.messageBoxVisible : ''}`}
                  >
                    {/* <label>
                      <span>Troco para: </span>
                      <input type="number" className={styles.troco}/>
                    </label>
                    <label>
                      <input type="checkbox" />
                      <span>Não preciso de troco.</span>
                    </label> */}
                    <label>
                      <span>Realizar pagamento com atendente/entregador.</span>
                    </label>
                  </div>
                </div>
                <div className={styles.paymentOption}>
                  <label
                    className={selectedPayment === 'Pix' ? styles.labelSelected : ''}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Pix"
                      checked={selectedPayment === 'Pix'}
                      onChange={handleRadioChange}
                      required
                    />
                    Pix
                  </label>
                  <div
                    className={`${styles.messageBox} ${selectedPayment === 'Pix' ? styles.messageBoxVisible : ''}`}
                  >
                    <p>Chave PIX: email@example.com</p>
                  </div>
                </div>
                <div className={styles.paymentOption}>
                  <label
                    className={selectedPayment === 'Voucher' ? styles.labelSelected : ''}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Voucher"
                      checked={selectedPayment === 'Voucher'}
                      onChange={handleRadioChange}
                      required
                    />
                    Voucher/Vale Alimentação ou Refeição
                  </label>
                  <div
                    className={`${styles.messageBox} ${selectedPayment === 'Voucher' ? styles.messageBoxVisible : ''}`}
                  >
                    <p>Aceitamos Sodexo, VR, e Alelo.</p>
                  </div>
                  </div>
              </div>
              <div className={styles.wrapItens}>
                <div>
                  <h2>Itens do pedido</h2>
                    <ul>
                      {cart && cart.length > 0 ? (
                        cart.map(item => (
                          <li key={item.id}>
                            {item.quantity}x {item.name || 'Produto desconhecido'} - R${item.price}
                          </li>
                        ))
                      ) : (
                        <p>Nenhum item encontrado no carrinho.</p>
                      )}
                    </ul>
                </div>
                <p className={styles.total}>Valor total: R${calculaPrecoTotal().toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.wrapBtn}>
              <Botao onClick={() => navigate('/dados')} label="Voltar" />
              <Botao type="submit" label="Prosseguir" backgroundColor="var(--laranja)"/>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
