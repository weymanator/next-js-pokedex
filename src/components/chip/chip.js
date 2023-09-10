import styles from './chip.module.sass'

export default function Chip({ text }) {
    return (
        <div className={styles.container}>
            <span className={styles.text}>{text}</span>
        </div>
    )
}