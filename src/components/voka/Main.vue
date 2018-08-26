<template>
  <div class="game-container">
    <b-row>
        <b-col md="4"  class="text-left">
            <h2 ><i class="fa fa-grin-stars" />  Word</h2>
            <div>
                <label for="inp" class="inp">
                    <input  v-model="input" ref="wordInput" placeholder="Input your word"
                         @keyup.enter="checkWord"  />
                </label>
            </div>

            <div v-if="wordInfo != null" style="margin-top: 20px;">
                <WordInfo @addBookmarkWord="addBookmarkWord"  :wordInfo="wordInfo" :known="false" />
            </div>
        </b-col>

        <b-col md="8">
          <Bookmark ref="bookmark" @quickSearch="quickSearch" />
        </b-col>

    </b-row>
  </div>
</template>

<script>
import _ from 'underscore';
import WordInfo from './WordInfo.vue';
import Bookmark from './Bookmark.vue';

import {vokaApi} from 'api/index';
import {VokaHandler} from 'services/VokaHandler';

export default {
  name: 'Learn',
  components: {  WordInfo, Bookmark },
  data() {
    return {
        input: '',
        word: '',
        wordInfo: null,
    }
  },
  methods: { 
      checkWord () {
        let inputWord = this.input.trim();
        this.input = ''; // reset
        if(inputWord == '') {
            return;
        }
        let self = this;  
        
        vokaApi.lookupWord(inputWord).then(function(response){
            let serverWord = response.data;
            self.word = inputWord;
            /// push more information
            if(serverWord != null) {
              VokaHandler.grabMoreInfoToData(serverWord, self.$store.state.voka.bookmarkWords)
            }
            self.wordInfo = serverWord;
        })
      },
      // event from child component
      quickSearch(word) {
        this.input = word;
        this.checkWord();
         this.$scrollTo('body')
      },
      addBookmarkWord (info) {
        VokaHandler.insertBookmarkWord(info);
        this.$refs.bookmark.refreshData()
      }
  },
}
</script>

<style scoped>
.game-container {
  padding: 0 30px;
}
.inp {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
}
input {
  -webkit-appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 12px 0;
  height: 48px;
  font-size: 16px;
  font-weight: 500;

  border-bottom: 2px solid #c8ccd4;
  background: none;
  border-radius: 0;
  color: #223254;   
  text-align: center;
  transition: all 0.15s ease;
}

.inp input {
    border-bottom: 2px solid #07f;
}

input:disabled {
  border-bottom: 2px solid #c8ccd4;
}

input:hover {
  background: rgba(34,50,84,0.03);
}
input:not(:placeholder-shown) + span {
  color: #5a667f;
  transform: translateY(-26px) scale(0.75);
}
input:focus {
  background: none;
  outline: none;
}
</style>
