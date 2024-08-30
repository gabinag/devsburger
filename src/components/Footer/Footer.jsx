import styles from './Footer.module.css';
import iconWhats from '../../assets/images/icon-whatsapp.png';
import iconInsta from '../../assets/images/icon-insta.png';
import iconFace from '../../assets/images/icon-face.png';

export const Footer = () => {
  return (
    <footer>
        <div className={styles.footer}>
            <div className={styles.wrapIcons}>
              <img src={iconWhats} alt="" />
              <img src={iconFace} alt="" />
              <img src={iconInsta} alt="" />
            </div>
            <p className={styles.copyright}>© 2024 DevsBurger</p>
        </div>
    </footer>
  )
}
