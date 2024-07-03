import styles from './Botao.module.css';

export const Botao = ({ label, onClick, type = 'button', disabled = false }) => {
  return (
    <button 
    type={type} 
    onClick={onClick} 
    disabled={disabled} 
    className={styles.botao}
  >
    {label}
  </button>
  )
}
