import data from './data';
import _ from 'underscore';

var INOGRE_LIST_KEY = '_english.ignorelist';
var KNOW_LIST_KEY = '_english.knowlist';
var DISPLAY_WORD_KEY = '_english.displayNum';

_.each(data, function(word, index){
    word.highlight = false; //index;
    word.showMeaning = false;
});
//// end prepare for list data


var storage = window.localStorage;

const POST_LIMIT = storage.getItem(DISPLAY_WORD_KEY) || 30;
storage.setItem(DISPLAY_WORD_KEY, POST_LIMIT);


/// init ignore list 
var ignorelist = JSON.parse(storage.getItem(INOGRE_LIST_KEY) || '[]'); // get when import this file

/// init know list 
var knowlist = JSON.parse(storage.getItem(KNOW_LIST_KEY) || '[]'); // get when import this file


/// init full list without ignore list
var normallist = [];

var defineNormalList = function(){
    normallist = _.filter(data, function(word){
        if(_.contains(ignorelist, word.word)) {
            return false;
        }

        if(_.contains(knowlist, word.word)) {
            return false;
        }

        return true;
    })
}

var dataManager = {};
dataManager.addIgnoreWord = function(word){
    ignorelist.push(word.word);
    storage.setItem(INOGRE_LIST_KEY, JSON.stringify(ignorelist));
}

dataManager.addKnowWord = function(word){
    knowlist.push(word.word);
    storage.setItem(KNOW_LIST_KEY, JSON.stringify(knowlist));
}

dataManager.retriveWords = function(index = 0){
    defineNormalList();
    return normallist.chunkIndex(index, POST_LIMIT); // DEFAULT
}


dataManager.retriveKnownWords = function(){
    var result = [];
    _.each(knowlist, function(word){
        var wordItem = data[word];
        wordItem.showMeaning = false;
        wordItem.highlight = false;
        result.push(wordItem);
    })   
    return result;
}

dataManager.retriveIgnoreWords = function(){
    var result = [];
    _.each(ignorelist, function(word){
        var wordItem = data[word];
        wordItem.showMeaning = true;
        wordItem.highlight = false;
        result.push(wordItem);
    })   
    return result;
}

dataManager.countKnowWords = function(){
    return knowlist.length;
}

dataManager.countIgnoreWords = function(){
    return ignorelist.length;
}

dataManager.countTotalWords = function(){
    return _.size(data); // length was remove :))
}


export const DataManager = dataManager;

