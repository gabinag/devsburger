import styles from './Banner.module.css';
import { Botao } from '../Botao/Botao';
import imgBurger from '../../assets/images/img-banner.png';

export const Banner = () => {
  return (
    <div className={styles.banner}>
        <div className={styles.content}>
          <div>
            <h1>Conheça a DEVs BURGER e se supreenda!</h1>
            <p>Aqui você encontra os melhores hambúrgueres da cidade! Faça seu pedido e entre em um loop! </p>
            <Botao label="Faça seu pedido"/>
          </div>
          <img src={imgBurger} alt="Hambúrguer, batata frita e refrigerante ilustrativos" />
        </div>
    </div>
  )
}
