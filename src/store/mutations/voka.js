import _ from 'underscore';
import { VOKA_BOOKMARK_FETCH} from "../constants";
import {vokaApi} from 'api/index';

var api = {};

api[VOKA_BOOKMARK_FETCH] = function (state) {
    vokaApi.fetchBookmark().then(function(response){
        let words = response.data; // list from api
        state.voka.bookmarkWords = words;
    })
}


export const vokaMutation = api;