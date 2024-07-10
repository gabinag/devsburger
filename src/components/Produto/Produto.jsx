import styles from './Produto.module.css';

export const Produto = ({ products, addToCart, getQuantity }) => {
  return (
    <div className={styles.wrapCards}>
      {products.map((product) => (
        <div className={styles.card} key={product.id}>
          <img src={product.image} alt="" />
          <h3>{product.name}</h3>
          <p className={styles.desc}>{product.description}</p>
          <div className={styles.wrapFlex}>
            <p>R${product.price}</p>
            <button onClick={() => addToCart(product)}>Adicionar ao carrinho</button>
          </div>
          <div className={styles.qtd}>{getQuantity(product.id)}</div>
        </div>
      ))}
    </div>
  );
};
