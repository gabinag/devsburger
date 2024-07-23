import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { PedidoContext } from '../../context/PedidoContext';
import styles from './Dados.module.css';
import apiDevsBurger from '../../services/apiDevsBurger';
import apiCep from '../../services/apiCep';
import { Botao } from '../../components/Botao/Botao';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Dados = () => {
  const { cart } = useContext(CartContext);
  const { setMessage, setDeliveryMethod } = useContext(PedidoContext);
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({});
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: {
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: ''
    },
    paymentMethod: '',
    status: 'pending'
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
    ? `${form.address.logradouro}, ${form.address.numero} - ${form.address.bairro}${form.address.complemento ? ` (${form.address.complemento})` : ''}`
    : 'retirada na loja';

    const orderData = {
      ...form,
      deliveryMethod: deliveryOption,
      address: formattedAddress, 
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await apiDevsBurger.post('/order', orderData);
      const orderId = response.data.id;
      localStorage.setItem('orderId', orderId);
      localStorage.setItem('deliveryMethod', deliveryOption);
      setDeliveryMethod(deliveryOption); // Atualiza o contexto
      setMessage('Seu pedido foi para a cozinha e está sendo preparado!'); // Atualiza o contexto
      localStorage.setItem('message', 'Seu pedido foi para a cozinha e está sendo preparado!');
      navigate('/pedido');
    } catch (error) {
      console.error('Erro ao realizar pedido:', error);
      alert('Erro ao realizar pedido. Por favor, tente novamente.');
    }
  };

  const handleOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const consultaCep = async () => {
    if (cep.length === 8) {
      try {
        const response = await apiCep.get(`/${cep}/json/`);
        if (response.data.erro) {
          alert('CEP não encontrado.');
        } else {
          setEndereco(response.data);
          setForm((prevForm) => ({
            ...prevForm,
            address: {
              ...prevForm.address,
              logradouro: response.data.logradouro,
              bairro: response.data.bairro
            }
          }));
        }
      } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        alert('Erro ao consultar CEP. Por favor, tente novamente.');
      }
    } else {
      alert('CEP inválido. Por favor, digite um CEP com 8 dígitos.');
    }
  };

  return (
    <>
      <Header/>
      <div className={styles.dados}>
          <h1>Preencha os campos a seguir</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.wrapForm}>
              <section className={styles.firstSection}>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="phone">Telefone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
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
                    <div>
                      <input
                        type="text"
                        name="cep"
                        onChange={(e) => setCep(e.target.value)}
                        value={cep}
                      />
                      <button type="button" className={styles.btnCep} onClick={consultaCep}>Pesquisar</button>
                    </div>
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
              <section className={styles.secondSection}>
                <h3>Itens no Carrinho</h3>
                <div>
                  {cart.map((item) => (
                    <div key={item.id}>
                      <p>{item.quantity}x {item.name} - R${item.price * item.quantity}</p>
                    </div>
                  ))}
                  <p className={styles.total}>Total: R${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                </div>
                <div>
                  <label htmlFor="paymentMethod">Forma de Pagamento: </label>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled hidden>Selecionar</option>
                    <option value="Cartão">Cartão de Crédito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Pix">Pix</option>
                  </select>
                </div>
              </section>
            </div>
            <div className={styles.wrapBtn}>
                  <Botao onClick={() => navigate('/carrinho')} label="Alterar itens"/>
                  <Botao type="submit" label="Finalizar pedido"/>
            </div>
        </form>
      </div>
      <Footer/>
    </>
  )
}
