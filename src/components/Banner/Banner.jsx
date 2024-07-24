import styles from './Banner.module.css';
import { Botao } from '../Botao/Botao';
import imgBurger from '../../assets/burger.png';

export const Banner = () => {
  return (
    <div className={styles.banner}>
        <div className={styles.content}>
            <img src={imgBurger} alt="" />
            <div>
              <h1>O melhor hambúrguer você encontra no Devs Burger</h1>
              <p>Aqui você dá um run na comilança e fica em loop</p>
              <Botao label="Faça seu pedido"/>
            </div>
        </div>
    </div>
  )
}
