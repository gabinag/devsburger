import { createContext, useState, useEffect } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [form, setForm] = useState({
    address: {
      logradouro: '',
      numero: '',
      bairro: '',
      localidade: '',
      uf: '',
      complemento: ''
    },
    name: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [observation, setObservation] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(5); 

  useEffect(() => {
    const storedForm = JSON.parse(localStorage.getItem('form'));
    const storedDeliveryMethod = localStorage.getItem('deliveryMethod');
    const storedPaymentMethod = localStorage.getItem('paymentMethod');
    const storedObservation = localStorage.getItem('observation');
    const storedMessage = localStorage.getItem('message');

    if (storedForm) setForm(storedForm);
    if (storedDeliveryMethod) setDeliveryMethod(storedDeliveryMethod);
    if (storedPaymentMethod) setPaymentMethod(storedPaymentMethod);
    if (storedObservation) setObservation(storedObservation);
    if (storedMessage) setMessage(storedMessage);
    
  }, []);

  const clearPedido = () => {
    setForm({
      address: {
        logradouro: '',
        numero: '',
        bairro: '',
        localidade: '',
        uf: '',
        complemento: ''
      },
      name: '',
      phone: ''
    });
    setDeliveryMethod('');
    setPaymentMethod('');
    setObservation('');
    setMessage('');
    localStorage.removeItem('observation');
    localStorage.removeItem('form');
    localStorage.removeItem('deliveryMethod');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <PedidoContext.Provider 
      value={{
        form,
        setForm,
        deliveryMethod,
        setDeliveryMethod,
        paymentMethod,
        setPaymentMethod,
        observation,
        setObservation,
        deliveryFee,
        message,
        setMessage,
        clearPedido
    }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
