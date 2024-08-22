import { useContext, useEffect, useCallback, useState } from 'react';
import apiDevsBurger from '../../services/apiDevsBurger';
import styles from './Pedido.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { PedidoContext } from '../../context/PedidoContext';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Botao } from '../../components/Botao/Botao';

export const Pedido = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { message, setMessage, deliveryMethod, setDeliveryMethod } = useContext(PedidoContext);
    const { cart } = useContext(CartContext);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
        } else if (status === 'canceled') {
            newMessage = 'Seu pedido foi cancelado. Em caso de dúvida, entre em contato conosco.';
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

    async function handleCancelOrder(id) {
        setIsButtonDisabled(true);
        try {
            await apiDevsBurger.post("/order/status", { orderId: id, status: "canceled" });
        
            setOrder((prevOrder) => {
                if (prevOrder && prevOrder.id === id) {
                    return { ...prevOrder, status: "canceled" };
                }
                return prevOrder;
            });
            
            updateMessage("canceled", deliveryMethod);
        } catch (error) {
            console.error('Erro ao cancelar pedido:', error);
            setIsButtonDisabled(false);
        }
    }

    return (
        <>
            <Header />
            <div className="bgPassosPedido">
                <div className={styles.pedido}>
                    <h1 className="containerTitle">Status do Pedido</h1>
                    {loading ? (
                        <p className="loading">Carregando...</p>
                    ) : (
                        <>
                            {order ? (
                                <div className={styles.content}>
                                    <div>
                                        <p className={styles.notific}>{message}</p>
                                        <div className={styles.cancelButton}>
                                            <Botao
                                                onClick={() => handleCancelOrder(order.id)}
                                                disabled={isButtonDisabled}
                                                label="Cancelar Pedido"
                                            >
                                            </Botao>
                                        </div>
                                    </div>
                                    <div className={styles.wrapInfos}>
                                        <div>
                                            <p>Volte nesta tela para acompanhar seu pedido</p>
                                        </div>
                                        <div>
                                            <p>O tempo médio de espera é de 40 minutos</p>
                                        </div>
                                        <div>
                                            <p>Entre em contato conosco pelo nosso WhatsApp</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className={styles.vazio}>Não há pedidos feitos no momento, selecione os itens que deseja em <Link to="/" className={styles.vazioLink}>Produtos</Link>.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
