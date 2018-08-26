import { IGNORE_WORD, KNOW_WORD, KNOW_WORD_LIST, IGNORE_WORD_LIST, RETRIVE_KNOW_WORDS } from "../constants";
import _ from 'underscore';
import {DataManager} from '../../services/data_manager';

function updateState(state) {
    state.numKnownWords = DataManager.countKnowWords();
    state.numIgnoredWords =  DataManager.countIgnoreWords();
    state.numProcessedWords = state.numKnownWords + state.numIgnoredWords; 
    state.words = DataManager.retriveWords()
}
  
var api = {};

// process single word 
_.extend(api, {
  [IGNORE_WORD] (state, word) {
    DataManager.addIgnoreWord(word);
    // refresh data
    updateState(state);
  },

  [KNOW_WORD] (state, word) {
      console.log(word)
    DataManager.addKnowWord(word);
    // refresh data
    updateState(state);
  },
});

// process list words
_.extend(api, {
  [IGNORE_WORD_LIST] (state) {
    var selectedWords = _.filter(state.words, function(word){
      return word.highlight;
    })

    if(selectedWords.length == 0) { // do not process
      return;
    }
    _.each(selectedWords, function(word) {
        DataManager.addIgnoreWord(word);
    });
    updateState(state);
  },

  [KNOW_WORD_LIST] (state) {
    var selectedWords = _.filter(state.words, function(word){
      return word.highlight;
    })

    if(selectedWords.length == 0) { // do not process
      return;
    }
    _.each(selectedWords, function(word) {
        DataManager.addKnowWord(word);
    });

    // refresh data
    updateState(state);
  },
});

_.extend(api, {
  [RETRIVE_KNOW_WORDS] (state, mode) {
    switch(mode) {
      case 'VIEW_IGNORE':
        state.knownWords = DataManager.retriveIgnoreWords();
        break;
      case 'VIEW_KNOWN':
        state.knownWords = DataManager.retriveKnownWords();
        break;
    }
  }
})

export const checkApi = api;