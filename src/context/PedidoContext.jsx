import { createContext, useState, useEffect } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [form, setForm] = useState({});
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

    if (storedForm) setForm(storedForm);
    if (storedDeliveryMethod) setDeliveryMethod(storedDeliveryMethod);
    if (storedPaymentMethod) setPaymentMethod(storedPaymentMethod);
    if (storedObservation) setObservation(storedObservation);

    const storedMessage = localStorage.getItem('message');
    if (storedMessage) {
      setMessage(storedMessage);
    }
  }, []);

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
        setMessage
    }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
