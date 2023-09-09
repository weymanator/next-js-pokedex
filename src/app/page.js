import CollectionSection from "@/sections/collection"
import SearchSection from "@/sections/search"
import styles from './app.module.sass'

export default function Home() {
    return (
        <main className={styles.root}>
            <SearchSection />
            <CollectionSection />
        </main>
    )
}