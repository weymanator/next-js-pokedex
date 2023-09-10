import styles from './chip.module.sass'

export default function Chip({ text, ...props }) {
    return (
        <div className={styles.container} {...props}>
            <span className={styles.text}>{text}</span>
        </div>
    )
}