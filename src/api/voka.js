import axios from 'axios';
import _ from 'underscore';

function formatData(wordInfo) {
    _.each(wordInfo.sense, function(senses){
        _.each(senses, function(senseList){
            _.each(senseList, function(sense, index) {
                let pieces = sense.split("|");
                pieces = _.filter(pieces); // remove empty 

                if(pieces.length > 1) {
                    senseList[index] = {
                        header: pieces[0],
                        content: pieces[1],
                    }
                } else {
                    senseList[index] = {
                        header: '',
                        content: pieces[0],
                    }
                }

            })
        })
    })
}


function lookupWord(word) {
    return axios.post(base_url + 'admin/english/fetch', { word })
            .then((response) => {
                formatData(response.data);
                response.data.word = word;
                return response;
            }).catch(error => error)
}

function updateBookmark(word, sense){
    return axios.post(base_url + 'admin/english/update_bookmark', { word, sense })
            .then(response => response).catch(error => error)
}

function fetchBookmark(){
    return axios.get(base_url + 'admin/english/fetch_bookmark')
            .then((response) => {
                _.each(response.data, function(item){
                    item.sense = JSON.parse(item.sense);
                })
                return response;
            }).catch(error => error)
}


let voka = {
    lookupWord,
    fetchBookmark,
    updateBookmark
}

export const Voka = voka;
