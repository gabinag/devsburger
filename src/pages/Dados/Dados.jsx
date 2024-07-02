import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './Dados.module.css';
import apiDevsBurger from '../../services/apiDevsBurger';

export const Dados = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: {
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: ''
    },
    paymentMethod: 'Cartão',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in form.address) {
      setForm((prevForm) => ({
        ...prevForm,
        address: {
          ...prevForm.address,
          [name]: value
        }
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAddress = deliveryOption === 'delivery'
      ? `${form.address.logradouro}, ${form.address.numero} - ${form.address.bairro} (${form.address.complemento}) - ${form.address.cep}`
      : 'retirada na loja';

    const orderData = {
      ...form,
      address: formattedAddress, 
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await apiDevsBurger.post('/order', orderData);
      alert('Pedido realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao realizar pedido:', error);
      alert('Erro ao realizar pedido. Por favor, tente novamente.');
    }
  };

  const handleOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  return (
    <div className={styles.dados}>
        <h1>Preencha os campos a seguir</h1>
        <form onSubmit={handleSubmit}>
        <section className={styles.firstSection}>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <p>Selecione a forma de entrega:</p>
            <div className={styles.wrapRadio}>
              <div>
                <input type="radio" id="delivery" name="entrega" value="delivery" checked={deliveryOption === 'delivery'}
                onChange={handleOptionChange} />
                <label htmlFor="delivery">Delivery</label>
              </div>
              <div>
                <input type="radio" id="retirar" name="entrega" value="retirar" checked={deliveryOption === 'retirar'}
                onChange={handleOptionChange} />
                <label htmlFor="retirar">Retirar na loja</label>
              </div>
            </div>
          </div>
          {deliveryOption === 'delivery' && (
          <div>
            <div>
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                name="cep"
                onChange={handleChange}
              />
              <button>Pesquisar</button>
            </div>
            <div className={styles.wrapInputs}>
              <div>
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  type="text"
                  name="logradouro"
                  value={form.address.logradouro}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="numero">Nº</label>
                <input
                  type="number"
                  name="numero"
                  value={form.address.numero}
                  onChange={handleChange}
                  required
                  className={styles.sizeInput}
                />
              </div>
            </div>
            <div className={styles.wrapInputs}>
              <div>
                <label htmlFor="bairro">Bairro</label>
                <input
                  type="text"
                  name="bairro"
                  value={form.address.bairro}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="complemento">Complemento</label>
                <input
                  type="text"
                  name="complemento"
                  value={form.address.complemento}
                  onChange={handleChange}
                  className={styles.sizeInput}
                />
              </div>
            </div>
          </div>
          )}
        </section>
        <section>
          <h3>Itens no Carrinho</h3>
          <div>
            {cart.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>Quantidade: {item.quantity}</p>
                <p>Preço: R${item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="paymentMethod">Método de Pagamento</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="Cartão">Cartão de Crédito/Débito</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Pix">Pix</option>
            </select>
          </div>
          <button type="submit">Finalizar Pedido</button>
        </section>
      </form>
    </div>
  )
}
