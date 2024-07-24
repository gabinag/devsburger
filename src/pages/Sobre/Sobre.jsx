import styles from './Sobre.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Sobre = () => {
  return (
    <>
        <Header/>
          <div className={styles.wrapBannerSobre}>
            <section className={styles.bannerSobre}>
              <h1>Conheça a Devs Burger</h1>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam quo nemo recusandae dolorum alias tempora vel quam aperiam, labore, eos, omnis doloremque ullam provident dolorem nam. Harum modi illo repudiandae.</p>
            </section>
          </div>
          <div className={styles.sobre}>
          <section className={styles.manualSobre}>
            <h2>Como faço o pedido?</h2>
            <ul>
              <li>passo 1</li>
              <li>passo 2</li>
              <li>passo 3</li>
              <li>passo 4</li>
            </ul>
          </section>
          <section>
            <h3>Horários de funcionamento</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </section>
          <section className={styles.enderecoSobre}>
            <h3>Nosso endereço</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </section>
        </div>
    </>
  )
}
