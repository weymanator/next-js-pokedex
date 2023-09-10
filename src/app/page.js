'use client'

import CollectionSection from "@/sections/collection"
import SearchSection from "@/sections/search"
import styles from './app.module.sass'
import { persistor, wrapper } from "@/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

export default function Home({...props}) {
    const {store} = wrapper.useWrappedStore(props);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <main className={styles.root}>
                    <SearchSection />
                    <CollectionSection />
                </main>
            </PersistGate>
        </Provider>
    )
}
