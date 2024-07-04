import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
        <nav className={styles.headerNav}>
            <p>Logo</p>
            <ul className={styles.headerList}>
                <li>Produtos</li>
                <li>Sobre</li> 
                {/* horário de funcionamento, como fazer pedido, como entrar em contato, endereço, redirecionamento para os produtos */}
                <li>Meu pedido</li>
            </ul>
        </nav>
    </header>
  )
}
