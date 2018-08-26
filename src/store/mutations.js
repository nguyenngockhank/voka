import _ from 'underscore';
import {vokaMutation} from './mutations/voka';
// import {checkApi} from './mutations/check';

var api = {};

// _.extend(api, checkApi);
_.extend(api, vokaMutation);


export const mutations = api;