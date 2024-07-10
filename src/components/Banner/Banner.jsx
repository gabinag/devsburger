import styles from './Banner.module.css'
import { Botao } from '../Botao/Botao'
import imgBurger from '../../assets/burger.png'

export const Banner = () => {
  return (
    <div className={styles.banner}>
        <div className={styles.content}>
            <img src={imgBurger} alt="" />
            <div>
              <h1>O melhor hambúrguer você encontra no Devs Burger</h1>
              <p>Veja nossos deliciosos hambúrgueres e faça seu pedido</p>
              <Botao label="Ver produtos"/>
            </div>
        </div>
    </div>
  )
}
