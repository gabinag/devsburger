import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.header}>
        <nav className={styles.headerNav}>
            <p>Logo</p>
            <ul className={styles.headerList}>
                <li><Link to="/" className={styles.link}>Produtos</Link></li>
                <li><Link to="/sobre" className={styles.link}>Sobre</Link></li> 
                <li><Link to="/pedido" className={styles.link}>Meu Pedido</Link></li>
            </ul>
        </nav>
    </header>
  )
}
