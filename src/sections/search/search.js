import TextField from '@/components/textField'
import styles from './search.module.sass'

export default function SearchSection() {
    return (
        <section className={styles.root}>
            <TextField placeholder="Search a Pokemon by name" />
        </section>
    )
}