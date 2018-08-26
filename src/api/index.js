let axios = require('axios');

export function lookupWord(word) {
    return axios.post(api_url + 'game/lookup', { word: word })
                .then(response => response).catch(error => error)
}

import {Voka} from './voka';
export let vokaApi = Voka;