import { useContext, useEffect, useCallback, useState } from 'react';
import apiDevsBurger from '../../services/apiDevsBurger';
import styles from './Pedido.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { PedidoContext } from '../../context/PedidoContext';
import { Link } from 'react-router-dom';
import { Botao } from '../../components/Botao/Botao';
import iconCloche from '../../assets/images/icon-cloche.png';
import iconWpMarrom from '../../assets/images/icon-whatsapp-marrom.png';
import iconClock from '../../assets/images/icon-clock.png';

export const Pedido = () => {
    const [order, setOrder] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const { message, setMessage, deliveryMethod, setDeliveryMethod } = useContext(PedidoContext);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [orderToCancel, setOrderToCancel] = useState(null); 

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const updateMessage = useCallback((status, address) => {
        let newMessage = '';

        if (status === 'ready') {
            if (address === 'Retirada na loja') {
                newMessage = 'O seu pedido está pronto! Retire na loja';
            } else {
                newMessage = 'O seu pedido está pronto e indo até você';
            }
        } else if (status === 'doing') {
            newMessage = 'O seu pedido está sendo preparado...';
        } else if (status === 'pending') {
            newMessage = 'Aguardando a aprovação do pedido...';
        } else if (status === 'canceled') {
            newMessage = 'Seu pedido foi cancelado. Em caso de dúvida, entre em contato conosco.';
        }
        setMessage(newMessage);
        localStorage.setItem('message', newMessage); 
    }, [setMessage]);

    const isOrderUpdated = (prevOrder, nextOrder) => {
        return prevOrder?.status !== nextOrder?.status;
    };

    useEffect(() => {
        const fetchOrder = async () => {
            const orderId = localStorage.getItem('orderId'); 
            const storedDeliveryMethod = localStorage.getItem('deliveryMethod'); 

            if (storedDeliveryMethod) {
                setDeliveryMethod(storedDeliveryMethod); 
            }

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
                    updateMessage(fetchedOrder.status, fetchedOrder.address); 
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
    }, [order, deliveryMethod, updateMessage]);

    const handleCancelOrder = async (id) => {
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
        } finally {
            setIsModalOpen(false); 
        }
    };

    const openModal = (id) => {
        setOrderToCancel(id); 
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };

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
                                        <div className={styles.details}>
                                            <h2>Detalhes do Pedido</h2>
                                            <div className={styles.wrapDetails}>
                                                <div>
                                                    <p>Entrega: {order.address}</p>
                                                    <p>Forma de Pagamento: {order.paymentMethod}</p>
                                                    <p>Valor Total: R${order.totalPrice.toFixed(2)}</p>
                                                </div>
                                                <div>
                                                    <h3>Itens do Pedido:</h3>
                                                    <ul>
                                                        {order.orderItems.map((item) => (
                                                            <li key={item.product.name}>
                                                                {item.product.name} - Quantidade: {item.quantity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.cancelButton}>
                                            <Botao
                                                onClick={() => openModal(order.id)} 
                                                disabled={isButtonDisabled}
                                                label="Cancelar Pedido"
                                            >
                                            </Botao>
                                        </div>
                                    </div>
                                    <div className={styles.wrapInfos}>
                                        <div>
                                            <img src={iconCloche} alt="Ícone de cloche" />
                                            <p>Volte nesta tela para acompanhar seu pedido</p>
                                        </div>
                                        <div>
                                            <img src={iconClock} alt="Ícone de relógio" />
                                            <p>O tempo médio de espera é de 40 minutos</p>
                                        </div>
                                        <div>
                                            <img src={iconWpMarrom} alt="Ícone do whatsapp" />
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

            {/* Modal de confirmação */}
            {isModalOpen && (
                <div className={styles.modal} onClick={handleOverlayClick}>
                    <div className={styles.modalContent}>
                        <h2>Você tem certeza que deseja <br />cancelar este pedido?</h2>
                        <div className={styles.modalActions}>
                            <button onClick={closeModal}>Fechar</button>
                            <button onClick={() => handleCancelOrder(orderToCancel)}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </>
    );
};
