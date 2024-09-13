import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Revisao.module.css';
import apiDevsBurger from '../../services/apiDevsBurger';
import { Botao } from '../../components/Botao/Botao';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { CartContext } from '../../context/CartContext';
import { PedidoContext } from '../../context/PedidoContext';

export const Revisao = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const {
    form,
    deliveryMethod,
    paymentMethod,
    observation,
    deliveryFee,
    clearPedido
  } = useContext(PedidoContext);

  const calculaPrecoTotal = () => {
    let totalPrice = cart.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
    if (deliveryMethod == "delivery") {
      totalPrice += deliveryFee; 
    }
    
    return totalPrice;
  };

  const handleConfirm = async () => {
    const totalPrice = calculaPrecoTotal();
    const formattedAddress = deliveryMethod === 'delivery'
      ? `${form.address.logradouro}, ${form.address.numero} - ${form.address.bairro}, ${form.address.localidade} - ${form.address.uf}${form.address.complemento ? ` (${form.address.complemento})` : ''}`
      : 'Retirada na loja';

    const orderData = {
      ...form,
      deliveryMethod,
      address: formattedAddress,
      paymentMethod,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      observation: observation || null,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
    };

    try {
      const response = await apiDevsBurger.post('/order', orderData);
      const orderId = response.data.id;
      localStorage.setItem('orderId', orderId);
      clearCart();
      clearPedido();
      navigate('/pedido');
    } catch (error) {
      console.error('Erro ao realizar pedido:', error.response?.data || error.message);
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
            <div className={styles.wrapCardRevisao}>
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
                  <Botao label="Editar carrinho" backgroundColor="var(--marrom)" fontSize="1.5rem" onClick={() => navigate('/carrinho')} />
                </div>
              </div>
              <div className={styles.cardRevisao}>
                <div>
                  <h2>Identificação</h2>
                  <p>{form.name || 'Não disponível'}</p>
                  <p>{form.phone || 'Não disponível'}</p>
                  <p>{deliveryMethod === 'delivery' ? 'Delivery' : 'Retirar na loja'}</p>
                  {deliveryMethod === 'delivery' && (
                    <p>{`${form.address.logradouro || ''}, ${form.address.numero || ''} - ${form.address.bairro || ''}, ${form.address.localidade} - ${form.address.uf}${form.address.complemento ? ` (${form.address.complemento})` : ''}`}</p>
                  )}
                </div>
                <div className={styles.btnEdit}>
                  <Botao label="Editar identificação" backgroundColor="var(--marrom)" fontSize="1.5rem" onClick={() => navigate('/dados')} />
                </div>
              </div>
              <div className={styles.cardRevisao}>
                <div>
                  <h2>Forma de Pagamento</h2>
                  <p>{paymentMethod || 'Não disponível'}</p>
                  <p><strong>Total a pagar:</strong> R${calculaPrecoTotal().toFixed(2)}</p>
                </div>
                <div className={styles.btnEdit}>
                  <Botao label="Editar forma de pagamento" backgroundColor="var(--marrom)" fontSize="1.5rem" onClick={() => navigate('/pagamento')} />
                </div>
              </div>
            </div>
            <div className={styles.wrapBtn}>
              <Botao onClick={() => navigate('/pagamento')} label="Voltar" />
              <Botao onClick={handleConfirm} label="Finalizar Pedido" backgroundColor="var(--laranja)" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
