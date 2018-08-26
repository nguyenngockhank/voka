import _ from 'underscore';
import {vokaApi} from 'api/index';
import {VokaData} from './VokaData';

let instance = {};

function playPrononciation(pronounce){
    var web = 'https://dictionary.cambridge.org/';
    var url = web + pronounce.mp3;
    new Audio(url).play()
}

function grabMoreInfoToData(serverInfo){
    _.each(serverInfo.sense, function(groupSense, religion) {
        _.each(groupSense, function( senseList, wordType) {
            _.each(senseList, function(sense){
                sense.marked = VokaData.isWordSenseExistence( serverInfo.word, sense);
            })
        })
    });
}

function insertBookmarkWord({ word, religion, wordType, sense }) {

    let wordInfo = VokaData.getWord(word);
    let foundWord = wordInfo != null; // lookUpInBookmark();

    if(foundWord && VokaData.isSenseInContent(sense, wordInfo.sense)) {
        return;
    }

    sense = _.pick(sense, ['content', 'header']); /// just get 2 attribute to store
    // console.log(foundWord, wordInfo)

    let content = foundWord ? _.cloneDeep(wordInfo.sense) : {};
    if(foundWord && _.has(content, religion)) {
        if(!_.has(content[religion], wordType)) {
            content[religion][wordType] = [];
        } 
        content[religion][wordType].unshift(sense);
    } else { // set
        content[religion] = {
            [wordType]: [ sense ],
        };
    }


    if(foundWord) {
        VokaData.updateWordContent(word, content);
    } else {
        VokaData.insertWord(word, content);
    }


    /// CALL API TO UPDATE SERVER DATABASE
    vokaApi.updateBookmark(word, content).then(function(resp){
        // vokaApi.fetchBookmark().then(function(response){
        //     let words = response.data; // list from api
        //     state.voka.bookmarkWords = words;
        // })
    });

}




instance.playPrononciation = playPrononciation;
instance.grabMoreInfoToData = grabMoreInfoToData;
instance.insertBookmarkWord = insertBookmarkWord;

export const VokaHandler = instance;