import { pick } from 'lodash'
import { capital } from "@/utils/strings"

export default class Pokemon {
    constructor(raw) {
        this.__raw = pick(raw, [
            'id',
            'localId',
            'sprites',
            'name',
            'types',
        ])
    }

    get cover() {
        return (
            this.__raw?.sprites?.other?.['official-artwork']?.front_default
            ?? this.__raw?.sprites?.front_default
        )
    }

    get name() {
        return capital(this.__raw?.name)
    }

    get number() {
        return `#${this.__raw?.id?.toString?.().padStart?.(4, '0')}`
    }

    get types() {
        return this.__raw?.types?.map?.(item => capital(item?.type?.name))
    }
}