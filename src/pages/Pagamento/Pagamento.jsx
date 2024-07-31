import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pagamento.module.css';
import { Botao } from '../../components/Botao/Botao';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Pagamento = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/revisao');
  };

  return (
    <>
      <Header />
      <div className={styles.pagamento}>
        <h1>Escolha a forma de pagamento</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.wrapForm}>
            <label htmlFor="paymentMethod">Forma de Pagamento:</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>Selecionar</option>
              <option value="Cartão">Cartão de Crédito</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Pix">Pix</option>
            </select>
          </div>
          <div className={styles.wrapBtn}>
            <Botao type="submit" label="Confirmar pagamento" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
