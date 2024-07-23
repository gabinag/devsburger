import { createContext, useState, useEffect } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');

  useEffect(() => {
    const storedDeliveryMethod = localStorage.getItem('deliveryMethod');
    if (storedDeliveryMethod) {
      setDeliveryMethod(storedDeliveryMethod);
    }

    const storedMessage = localStorage.getItem('message');
    if (storedMessage) {
      setMessage(storedMessage);
    }
  }, []);

  return (
    <PedidoContext.Provider value={{ message, setMessage, deliveryMethod, setDeliveryMethod }}>
      {children}
    </PedidoContext.Provider>
  );
};
