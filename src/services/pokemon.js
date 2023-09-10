import Pokemon from "@/data/Pokemon";
import CoreService from "./core";

export default class PokemonService extends CoreService {
    async findByName(name) {
        if (name == null || name === '') return []
        const raw = await this.request({
            path: `api/v2/pokemon/${encodeURIComponent(this.clearTextParam(name).toLowerCase())}`
        });
        if (raw == null) return []
        return this.safeArray(raw).map(item => new Pokemon(item))
    }
}