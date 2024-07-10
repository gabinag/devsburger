import styles from './Produto.module.css';

export const Produto = ({ id, title, products, removeFromCart, addToCart, getQuantity }) => {
  return (
    <section id={id} className={styles.produto}>
      <h2>{title}</h2>
      <div className={styles.wrapCards}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <img src={product.image} alt="" />
            <h3>{product.name}</h3>
            <p className={styles.desc}>{product.description}</p>
            <div className={styles.wrapFlex}>
              <p>R${product.price}</p>
              <div className={styles.wrapQtd}>
                <button onClick={() => removeFromCart(product.id)}>-</button>
                <p>{getQuantity(product.id)}</p>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
