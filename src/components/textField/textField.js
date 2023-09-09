import styles from './textField.module.sass'

export default function TextField(props) {
    return (
        <div className={styles.container}>
            <input className={styles.input} type="text" {...props}></input>
        </div>
    )
}