import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

import apiDevsBurger from '../../services/apiDevsBurger';

export const Dados = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Cartão',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
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

  return (
    <div>
        <h1>Dados do cliente</h1>
        <form onSubmit={handleSubmit}>
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
          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
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

        <button type="submit">Finalizar Pedido</button>
      </form>
    </div>
  )
}
