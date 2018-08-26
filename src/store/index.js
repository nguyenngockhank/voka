import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'
import plugins from './plugins'
// import {DataManager} from '../services/data_manager';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    voka: {
      // bookmarkWords: [],
    },
    // words: DataManager.retriveWords(), 
    // knownWords: [],
    // totalWords: DataManager.countTotalWords(),
    // numKnownWords: DataManager.countKnowWords(),
    // numIgnoredWords: DataManager.countIgnoreWords(),
    // numProcessedWords: DataManager.countKnowWords() + DataManager.countIgnoreWords(),
  },
  actions,
  mutations,
  plugins
})