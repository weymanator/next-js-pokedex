import clsx from "clsx"
import styles from './button.module.sass'

export default function Button({ className, ...props }) {
    const classNames = clsx(styles.button, className)

    return <input type="button" className={classNames} {...props} />
}