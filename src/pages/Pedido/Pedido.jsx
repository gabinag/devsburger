import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiDevsBurger from '../../services/apiDevsBurger';
import styles from './Pedido.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Pedido = () => {
    const [order, setOrder] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); 
    const location = useLocation();

    useEffect(() => {
        const orderId = localStorage.getItem('orderId');

        if (!orderId) {
            console.error('ID do pedido não encontrado');
            setMessage('Não há pedidos feitos, selecione os itens no carrinho em Produtos');
            setLoading(false); 
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await apiDevsBurger.get(`/orders/${orderId}`);
                const fetchedOrder = response.data;

                if (!order || isOrderUpdated(order, fetchedOrder)) {
                    setOrder(fetchedOrder);
                    updateMessage(fetchedOrder.status, fetchedOrder.deliveryMethod);
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
        
    }, [order]);

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message);
        }
    }, [location]);

    const updateMessage = (status, deliveryMethod) => {
        if (status === 'ready') {
            if (deliveryMethod === 'delivery') {
                setMessage('O pedido está indo até você');
            } else if (deliveryMethod === 'retirar') {
                setMessage('O seu pedido está pronto! Retire na loja');
            }
        } else if (status === 'pending') {
            setMessage('Seu pedido foi para a cozinha e está sendo preparado!');
        } else {
            setMessage('');
        }
    };

    const isOrderUpdated = (prevOrder, nextOrder) => {
        return (
            prevOrder.status !== nextOrder.status ||
            false 
        );
    };

    return (
        <>
            <Header/>
            <div className={styles.pedido}>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        {order ? (
                            <>
                                <p className={styles.notific}>{message}</p>
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
            <Footer/>
        </>
    );
};
