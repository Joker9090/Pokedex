import styles from '../styles/AnimatedBackground.module.css';

const AnimatedBackground = ({ children }: any) => (
  <div className={styles.AnimatedBackground}>
    <div className={styles.Background}></div>
    <div className={styles.PositionFix}>
      {children}
    </div>
  </div>
)

export default AnimatedBackground;