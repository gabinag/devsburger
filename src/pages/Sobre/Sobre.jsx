import styles from './Sobre.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import burgerVoando from '../../assets/images/burger-voando.png';
import iconCarrinho from '../../assets/images/icon-carrinho2.png';
import iconClipboard from '../../assets/images/icon-clipboard.png';
import iconCheck from '../../assets/images/icon-check-square.png';
import mapa from '../../assets/images/mapa.png';
import iconWhats from '../../assets/images/icon-whatsapp.png';
import iconInsta from '../../assets/images/icon-insta.png';
import iconTel from '../../assets/images/icon-tel.png';
import iconMail from '../../assets/images/icon-mail.png';

export const Sobre = () => {
  return (
    <>
      <Header/>
      <section className={styles.bannerSobre}>
        <div className={styles.wrapBannerSobre}>
          <img src={burgerVoando} alt="Imagem ilustrativa de hambúrguer" className={styles.imgTopoSobre}/>
          <div>
            <div className={styles.contentSobreTopo}>
              <h1>O melhor hambúrguer da cidade de Santos!</h1>
              <p>Desde 2019 entregando a melhor experiência e qualidade para você. Aqui a eficiência na realização do pedido é garantida, basta apenas:</p>
            </div>
            <div className={styles.cardsSobre}>
              <div>
                <img src={iconCarrinho} alt="Ícone de carrinho" />
                <p>Adicionar itens desejados ao carrinho</p>
              </div>
              <div>
                <img src={iconClipboard} alt="Ícone de clipboard" />
                <p>Inserir dados, forma de entrega e pagamento</p>
              </div>
              <div>
                <img src={iconCheck} alt="Ícone de check" />
                <p>Acompanhar o status do seu pedido</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.localizacao}>
        <div className={styles.wrapLocalizacao}>
          <h2>Localização</h2>
          <div className={styles.wrapContentLocalizacao}>
            <img src={mapa} alt="Mapa da localização fictícia do restaurante" />
            <div>
              <h3>R. Liberdade, 123 - Aparecida, Santos - SP</h3>
              <p className={styles.localDesc}>Canal 5 - Próximo ao mercado Big Bom</p>
              <div className={styles.wrapInfoLocalizacao}>
                <p>Retire seu pedido em nossa loja</p>
                <p>ou</p>
                <p>Peça por delivery (taxa fixa de R$5)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div>
            <h2>Horário de funcionamento</h2>
          </div>
          <div>
            <h2>Entre em contato</h2>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}
