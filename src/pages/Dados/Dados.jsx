import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask'; 
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
      localidade: '',
      uf: '',
      complemento: ''
    }
  });

  useEffect(() => {
    const storedForm = localStorage.getItem('form');
    if (storedForm) {
      setForm(JSON.parse(storedForm)); 
    }
  
    const storedDeliveryOption = localStorage.getItem('deliveryOption');
    if (storedDeliveryOption) {
      setDeliveryOption(storedDeliveryOption); 
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name in form.address) {
      const updatedForm = {
        ...form,
        address: {
          ...form.address,
          [name]: value
        }
      };
      setForm(updatedForm);
      localStorage.setItem('form', JSON.stringify(updatedForm)); 
    } else {
      const updatedForm = {
        ...form,
        [name]: value
      };
      setForm(updatedForm);
      localStorage.setItem('form', JSON.stringify(updatedForm)); 
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (deliveryOption === 'delivery') {
      if (form.address.localidade.toLowerCase() !== 'santos') {
        alert('No momento só realizamos entregas na cidade de Santos.');
        return; 
      }
    }

    localStorage.setItem('form', JSON.stringify(form));
    localStorage.setItem('deliveryOption', deliveryOption);
    setDeliveryMethod(deliveryOption);
    navigate('/pagamento');
  };

  const handleOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const consultaCep = async () => {
    if (cep.length === 9) {
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
              bairro: response.data.bairro,
              localidade: response.data.localidade,
              uf: response.data.uf
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
      <div className='bgPassosPedido'>
        <div className='container'>
          <h1 className='containerTitle'>Identificação</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.wrapForm}>
              <section className={styles.sectionForm}>
                <label htmlFor="name">Nome completo*</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="phone">Telefone*</label>
                <InputMask
                  mask="(99) 99999-9999"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <div>
                  <p>Selecione a forma de entrega*</p>
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
              </section>
              <section className={styles.sectionForm}>
                {deliveryOption === 'delivery' && (
                  <div>
                    <div>
                      <label htmlFor="cep">CEP*</label>
                      <div className={styles.wrapCep}>
                        <InputMask
                          mask="99999-999"
                          name="cep"
                          onChange={(e) => {
                            setCep(e.target.value);
                            handleChange(e); 
                          }}
                          value={cep}
                        />
                        <button type="button" className={styles.btnCep} onClick={consultaCep}>
                          Pesquisar
                        </button>
                      </div>
                    </div>
                    <div className={styles.wrapInputs}>
                      <div>
                        <label htmlFor="logradouro">Logradouro*</label>
                        <input
                          type="text"
                          name="logradouro"
                          value={form.address.logradouro}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="numero">Número*</label>
                        <input
                          type="number"
                          name="numero"
                          value={form.address.numero}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.wrapInputs}>
                      <div>
                        <label htmlFor="bairro">Bairro*</label>
                        <input
                          type="text"
                          name="bairro"
                          value={form.address.bairro}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="localidade">Cidade*</label>
                        <input
                          type="text"
                          name="localidade"
                          value={form.address.localidade}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.wrapInputs}>
                      <div>
                        <label htmlFor="uf">Estado*</label>
                        <input
                          type="text"
                          name="uf"
                          value={form.address.uf}
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
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
            <div className={styles.wrapBtn}>
              <Botao onClick={() => navigate('/carrinho')} label="Voltar" />
              <Botao type="submit" label="Prosseguir" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
