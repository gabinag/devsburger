import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiDevsBurger from '../../services/apiDevsBurger';
import styles from './Pedido.module.css';

export const Pedido = () => {
    const [order, setOrder] = useState(null);
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const orderId = localStorage.getItem('orderId');

        if (!orderId) {
            console.error('ID do pedido não encontrado');
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
            } catch (error) {
                console.error('Erro ao buscar pedido:', error);
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
        <div className={styles.orderStatus}>
            {order ? (
                <>
                    <h1>Status do Pedido</h1>
                    <p>Seu pedido foi para a cozinha</p>
                    <p>{message}</p>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};
