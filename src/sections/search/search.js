import { useEffect, useMemo, useState } from 'react'
import PokemonService from '@/services/pokemon';
import TextField from '@/components/textField'
import Card from '@/components/card';
import styles from './search.module.sass'
import ActivityIndicator from '@/components/activityIndicator';
import Button from '@/components/button';
import { useDispatch } from 'react-redux';
import { actionTypes } from '@/store';
import { Queue } from '@/utils/promises';

let firstLoad = true;

export default function SearchSection() {
    const [query, setQuery] = useState();
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchService = useMemo(() => new PokemonService('https://pokeapi.co/'), [])
    const queue = useMemo(() => new Queue, [])

    const dispatch = useDispatch()

    useEffect(() => {
        if (firstLoad) {
            firstLoad = false
            return
        }

        setLoading(true)

        const timeout = setTimeout(() => {
            queue.add((async () => {
                const results = await searchService.findByName(query)
                setSearchResults(results);
                setLoading(false)
            }))
        }, 1000)

        return function clean() {
            clearTimeout(timeout)
        }
    }, [query, searchService, queue])

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

    const handleAdd = (pokemon) => () => dispatch({ type: actionTypes.ADD, pokemon })

    return (
        <section className={styles.root}>
            <div>
                <TextField
                    placeholder="Search a Pokemon by name"
                    value={query}
                    onChange={handleQueryChange}
                />
            </div>
            {loading && <div className={styles['feedback-container']}><ActivityIndicator /></div>}
            {(query && !loading && searchResults.length === 0) && (
                <div className={styles['feedback-container']}>
                    <span>No pokemons where found</span>
                </div>
            )}
            {(!loading && searchResults.length !== 0) && (
                <ul className={styles['results-container']}>
                    {searchResults.map(item => (
                        <li key={item.number}>
                            <Card
                                horizontal
                                img={item.cover}
                                name={item.name}
                                number={item.number}
                                types={item.types}
                                actions={<Button value="Add" onClick={handleAdd(item)} />}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section >
    )
}