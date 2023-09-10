import axios from "axios";

export default class CoreService {
    constructor(base) {
        this.base = base
    }
    
    clearTextParam(param) {
        if (param == null) return
        return param.trim()
    }

    join(...paths) {
        return paths.map(path => path.replace(/^\/*|\/*$/g, '')).join('/')
    }

    safeArray(item) {
        if (Array.isArray(item)) return item
        return [item]
    }

    handleError(error) {
        if (error.response) {
            if (error.response.status === 404) {
                return undefined
            } else {
                throw error
            }
        }
        throw error
    }

    async request({ method = 'GET', path, params }) {
        try {
            const { data } = await axios({
                url: this.join(this.base, path),
                method: method.toUpperCase(),
                params: method.toUpperCase() === 'GET' ? params : undefined,
                data: method.toUpperCase() !== 'GET' ? params : undefined,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            return data
        } catch (error) {
            return this.handleError(error)
        }
    }
}