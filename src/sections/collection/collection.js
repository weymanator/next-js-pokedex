import { useDispatch, useSelector } from 'react-redux'
import styles from './collection.module.sass'
import Card from '@/components/card'
import Pokemon from '@/data/Pokemon'
import { actionTypes } from '@/store'
import Button from '@/components/button'
import { useState } from 'react'

const defaultCleanTitle = 'Clear all'

export default function CollectionSection() {
    const collection = useSelector(state => state.collection.map(item => new Pokemon(item)))
    const [cleanTitle, setCleanTitle] = useState(defaultCleanTitle)
    const dispatch = useDispatch();

    const handleRemove = (pokemon) => () => dispatch({
        type: actionTypes.REMOVE,
        id: pokemon.__raw.localId
    })

    const handleClear = () => {
        if (cleanTitle === defaultCleanTitle) {
            setCleanTitle('Are you sure?')
            setTimeout(() => setCleanTitle(defaultCleanTitle), 2000)
            return
        }
        dispatch({ type: actionTypes.CLEAN })
    }

    return (
        <section className={styles.root}>
            {collection.length === 0 && (
                <div className={styles['feedback-container']}>
                    <h1 className={styles.feedback__text}>Add some pokemos</h1>
                </div>
            )}
            {collection.length > 0 && (
                <div className={styles.header}>
                    <h1 className={styles.header__title}>Your collection</h1>
                    <Button value={cleanTitle} onClick={handleClear} />
                </div>
            )}
            <div className={styles.grid}>
                {collection.map(item => (
                    <Card
                        key={item.__raw.localId}
                        floatingIcon
                        img={item.cover}
                        name={item.name}
                        number={item.number}
                        types={item.types}
                        contentContainerClassNames={styles.card}
                        floatingContainerClassNames={styles['card-floating']}
                        onFloatingClicked={handleRemove(item)}
                    />
                ))}
            </div>
        </section>
    )
}