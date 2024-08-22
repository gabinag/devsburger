import styles from './Produto.module.css';
import iconCarrinho from '../../assets/images/icon-carrinho.png';

export const Produto = ({ products, addToCart, getQuantity }) => {
  return (
    <div className={styles.wrapCards}>
      {products.map((product) => (
        <div className={styles.card} key={product.id}>
          <img src={product.image} className={styles.imgProd} alt="Imagem do produto" />
          <h3>{product.name}</h3>
          <p className={styles.desc}>{product.description}</p>
          <div className={styles.wrapFlex}>
            <p>R${product.price}</p>
            <button onClick={() => addToCart(product)}>
              <img src={iconCarrinho} alt="Ícone de carrinho" />
              <span>Adicionar</span>
            </button>
          </div>
          {getQuantity(product.id) > 0 && (
            <div className={styles.qtd}>{getQuantity(product.id)}</div>
          )}
        </div>
      ))}
    </div>
  );
};
