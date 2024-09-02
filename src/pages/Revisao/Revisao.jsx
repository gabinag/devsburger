import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Revisao.module.css';
import apiDevsBurger from '../../services/apiDevsBurger';
import { Botao } from '../../components/Botao/Botao';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { CartContext } from '../../context/CartContext';

export const Revisao = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [deliveryOption, setDeliveryOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [observation, setObservation] = useState('');
  const { cart, clearCart } = useContext(CartContext); 

  useEffect(() => {
    const storedForm = JSON.parse(localStorage.getItem('form'));
    const storedDeliveryOption = localStorage.getItem('deliveryOption');
    const storedPaymentMethod = localStorage.getItem('paymentMethod');
    const storedObservation = localStorage.getItem('observation');

    if (storedForm && storedDeliveryOption && storedPaymentMethod) {
      setForm(storedForm);
      setDeliveryOption(storedDeliveryOption);
      setPaymentMethod(storedPaymentMethod);
      setObservation(storedObservation || '');
    } else {
      navigate('/dados');
    }
  }, [navigate]);

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleConfirm = async () => {
    const formattedAddress = deliveryOption === 'delivery'
      ? `${form.address.logradouro}, ${form.address.numero} - ${form.address.bairro}, ${form.address.localidade} - ${form.address.uf}${form.address.complemento ? ` (${form.address.complemento})` : ''}`
      : 'Retirada na loja';

    const orderData = {
      ...form,
      deliveryMethod: deliveryOption,
      address: formattedAddress,
      paymentMethod: paymentMethod,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      observation: observation || null,
    };

    if (observation.trim() !== '') {
      orderData.observation = observation;
    }

    try {
      const response = await apiDevsBurger.post('/order', orderData);
      const orderId = response.data.id;
      localStorage.setItem('orderId', orderId);
      localStorage.removeItem('observation');
      localStorage.removeItem('form');
      localStorage.removeItem('deliveryOption');
      localStorage.removeItem('paymentMethod');
      clearCart();
      navigate('/pedido');
    } catch (error) {
      console.error('Erro ao realizar pedido:', error);
      alert('Erro ao realizar pedido. Por favor, tente novamente.');
    }
  };

  return (
    <>
      <Header />
      <div className="bgPassosPedido">
        <div className="container">
          <h1 className="containerTitle">Revisão do Pedido</h1>
          <div className={styles.revisao}>
            <div className={styles.cardRevisao}>
              <div>
                <h2>Itens do Pedido</h2>
                  <ul>
                    {cart && cart.length > 0 ? (
                      cart.map(item => (
                        <li key={item.id}>
                          {item.name || 'Produto desconhecido'} - Quantidade: {item.quantity}
                        </li>
                      ))
                    ) : (
                      <p>Nenhum item encontrado no carrinho.</p>
                    )}
                  </ul>
                  {observation && (
                    <div>
                      <h3>Observação</h3>
                      <p>{observation}</p>
                    </div>
                  )}
              </div>
              <div className={styles.btnEdit}>
                <Botao label="Editar carrinho" backgroundColor="var(--marrom)" fontSize="1.5rem" onClick={() => navigate('/carrinho')}/>
              </div>
            </div>
            <div className={styles.cardRevisao}>
              <div>
                <h2>Identificação</h2>
                <p>{form.name || 'Não disponível'}</p>
                <p>{form.phone || 'Não disponível'}</p>
                <p>{deliveryOption === 'delivery' ? 'Delivery' : 'Retirar na loja'}</p>
                {deliveryOption === 'delivery' && (
                  <p>{`${form.address.logradouro || ''}, ${form.address.numero || ''} - ${form.address.bairro || ''}, ${form.address.localidade} - ${form.address.uf}${form.address.complemento ? ` (${form.address.complemento})` : ''}`}</p>
                )}
              </div>
              <div className={styles.btnEdit}>
                <Botao label="Editar identificação" backgroundColor="var(--marrom)" fontSize="1.5rem" onClick={() => navigate('/dados')}/>
              </div>
            </div>
            <div className={styles.cardRevisao}>
              <div>
                <h2>Forma de Pagamento</h2>
                <p>{paymentMethod || 'Não disponível'}</p>
                <p><strong>Total a pagar:</strong> R${totalPrice.toFixed(2)}</p> 
              </div>
              <div className={styles.btnEdit}>
                <Botao label="Editar forma de pagamento" backgroundColor="var(--marrom)" fontSize="1.5rem" onClick={() => navigate('/pagamento')}/>
              </div>
            </div>
            <div className={styles.wrapBtn}>
              <Botao onClick={() => navigate('/pagamento')} label="Voltar"/>
              <Botao onClick={handleConfirm} label="Finalizar Pedido" backgroundColor="var(--laranja)"/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
