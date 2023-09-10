import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { v4 as uuid } from "uuid"

export const defaultState = {
    loading: true,
    collection: [],
}

export const persistConfig = {
    key: 'collection',
    storage
}

export const actionTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            return {
                collection: [
                    { localId: uuid(), ...action.pokemon.__raw },
                    ...state.collection
                ],
            }
        case actionTypes.REMOVE:
            const index = state.collection.findIndex(item => item.localId === action.id)
            const clone = [...state.collection]
            if (index >= 0) clone.splice(index, 1)
            return { collection: clone }
        default:
            return state
    }
}

const persitedReducer = persistReducer(persistConfig, reducer)

export let persistor;

export const storeFactory = () => {
    const store = configureStore({
        reducer: persitedReducer,
        preloadedState: defaultState,
    })
    persistor = persistStore(store);
    return store;
}

export const wrapper = createWrapper(storeFactory)

