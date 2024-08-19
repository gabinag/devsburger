import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.headerNav}>
        <Link to="/"><img src={logo} alt="Logotipo da Devs Burger" className={styles.logo}/></Link>
        <ul className={`${styles.headerList} ${isMenuOpen ? styles.active : ''}`}>
            <li><Link to="/" className={`${styles.link} ${activeLink === '/' ? styles.activeLink : ''}`}>Produtos</Link></li>
            <li><Link to="/sobre" className={`${styles.link} ${activeLink === '/sobre' ? styles.activeLink : ''}`}>Sobre</Link></li> 
            <li><Link to="/pedido" className={`${styles.link} ${activeLink === '/pedido' ? styles.activeLink : ''}`}>Meu Pedido</Link></li>
        </ul>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
      </nav>
    </header>
  )
}
