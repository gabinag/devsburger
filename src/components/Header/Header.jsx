import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
        <nav className={styles.headerNav}>
            <p>Logo</p>
            <ul className={styles.headerList}>
                <li>Produtos</li>
                <li>Contato</li>
                <li>Meu pedido</li>
            </ul>
        </nav>
    </header>
  )
}
