import _ from 'underscore';

let instance = {};
var data = [];

instance.setData = (userData) => {data  = userData};
instance.getData = () => data;

instance.getWord = (word) => _.findWhere(data, {word});

instance.isSenseInContent = (needle, content) => {
    var found = false;
    _.every(content, function(groupSense, religion) {
        _.every(groupSense, function( senseList, wordType) {
            _.every(senseList, function(sense){
                found = (sense.content === needle.content);
                return !found; // not found 
            })
            return !found; // not found 
        })
        return !found; // not found 
    });
    return found;
}

instance.isWordSenseExistence = (word, sense) => {
    let wordInfo = instance.getWord(word);
    let foundWord = wordInfo != null; // lookUpInBookmark();
    if(!foundWord) {
        return false;
    }
    return instance.isSenseInContent(sense, wordInfo.sense);
}

instance.updateWordContent = (word, content) => {
    let wordInfo = VokaData.getWord(word);
    _.extend(wordInfo.sense, content);
}

instance.insertWord = (word, content) => {
    data.unshift({word, sense: content});
}



export const VokaData = instance;