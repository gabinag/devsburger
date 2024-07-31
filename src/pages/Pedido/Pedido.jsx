import { useContext, useEffect, useCallback, useState } from 'react';
import apiDevsBurger from '../../services/apiDevsBurger';
import styles from './Pedido.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { PedidoContext } from '../../context/PedidoContext';
import { CartContext } from '../../context/CartContext';

export const Pedido = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { message, setMessage, deliveryMethod, setDeliveryMethod } = useContext(PedidoContext);
    const { cart } = useContext(CartContext);

    const updateMessage = useCallback((status, deliveryMethod) => {
        let newMessage = '';

        if (status === 'ready') {
            if (deliveryMethod === 'delivery') {
                newMessage = 'O pedido está indo até você';
            } else if (deliveryMethod === 'retirar') {
                newMessage = 'O seu pedido está pronto! Retire na loja';
            }
        } else if (status === 'doing') {
            newMessage = 'Seu pedido está sendo preparado';
        } else if (status === 'pending') {
            newMessage = 'Aguardando a aprovação do pedido...';
        }

        setMessage(newMessage);
        localStorage.setItem('message', newMessage); 
    }, [setMessage]);

    useEffect(() => {
        const fetchOrder = async () => {
            const orderId = localStorage.getItem('orderId');
            if (!orderId) {
                console.error('ID do pedido não encontrado');
                setMessage('Não há pedidos feitos, selecione os itens no carrinho em Produtos');
                setLoading(false);
                return;
            }

            try {
                const response = await apiDevsBurger.get(`/orders/${orderId}`);
                const fetchedOrder = response.data;

                if (!order || isOrderUpdated(order, fetchedOrder)) {
                    setOrder(fetchedOrder);
                    updateMessage(fetchedOrder.status, deliveryMethod);
                }
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar pedido:', error);
                setLoading(false);
            }
        };

        fetchOrder();
        const intervalId = setInterval(fetchOrder, 5000);
        return () => clearInterval(intervalId);
    }, [order, deliveryMethod, updateMessage, setMessage]);

    useEffect(() => {
        const storedDeliveryMethod = localStorage.getItem('deliveryMethod');
        if (storedDeliveryMethod) {
            setDeliveryMethod(storedDeliveryMethod);
        }
    }, [setDeliveryMethod]);

    const isOrderUpdated = (prevOrder, nextOrder) => {
        return prevOrder.status !== nextOrder.status;
    };

    return (
        <>
            <Header />
            <div className={styles.pedido}>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        {order ? (
                            <>
                                <p className={styles.notific}>{message}</p>
                                <div className={styles.orderDetails}>
                                    {deliveryMethod === 'delivery' && (
                                        <p><strong>Endereço de entrega:</strong> {order.address}</p>
                                    )}
                                    {cart && cart.length > 0 && (
                                        <>
                                            <h2>Itens do Pedido</h2>
                                            <ul>
                                                {cart.map(item => (
                                                    <li key={item.id}>
                                                        {item.name || 'Produto desconhecido'} - Quantidade: {item.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                                <div className={styles.wrapInfos}>
                                    <div>
                                        <p>Volte nesta tela para acompanhar seu pedido</p>
                                    </div>
                                    <div>
                                        <p>Tempo médio de espera é de 40 min</p>
                                    </div>
                                    <div>
                                        <p>Entre em contato conosco pelo nosso WhatsApp</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Não há pedidos feitos no momento, selecione os itens que deseja em Produtos.</p>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};
