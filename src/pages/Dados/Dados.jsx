import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PedidoContext } from '../../context/PedidoContext';
import styles from './Dados.module.css';
import apiCep from '../../services/apiCep';
import { Botao } from '../../components/Botao/Botao';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Dados = () => {
  const { setDeliveryMethod } = useContext(PedidoContext);
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [cep, setCep] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: {
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: ''
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('form', JSON.stringify(form));
    localStorage.setItem('deliveryOption', deliveryOption);
    setDeliveryMethod(deliveryOption);
    navigate('/pagamento');
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
      <Header />
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
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <div>
                <p>Selecione a forma de entrega:</p>
                <div className={styles.wrapRadio}>
                  <div>
                    <input
                      type="radio"
                      id="delivery"
                      name="entrega"
                      value="delivery"
                      checked={deliveryOption === 'delivery'}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="delivery">Delivery</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="retirar"
                      name="entrega"
                      value="retirar"
                      checked={deliveryOption === 'retirar'}
                      onChange={handleOptionChange}
                    />
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
                      <button type="button" className={styles.btnCep} onClick={consultaCep}>
                        Pesquisar
                      </button>
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
          </div>
          <div className={styles.wrapBtn}>
            <Botao onClick={() => navigate('/carrinho')} label="Alterar itens" />
            <Botao type="submit" label="Prosseguir para pagamento" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
