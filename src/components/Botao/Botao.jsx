import styles from './Botao.module.css';

export const Botao = ({ label, onClick, type = 'button', disabled = false, backgroundColor, fontSize  }) => {
  return (
    <button 
    type={type} 
    onClick={onClick} 
    disabled={disabled} 
    className={styles.botao}
    style={{ backgroundColor, fontSize }}
  >
    {label}
  </button>
  )
}
