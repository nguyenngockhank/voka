
<template>
<div>
    <!-- HEADER INFO -->
    <h3><strong>{{wordInfo.word}}</strong></h3>

    <div style="margin-bottom: 10px;">
        <span  v-for="(pron, index) in wordInfo.pronounce">
            <span class="word-pron-wrapper" v-if="pron.mp3 != ''">
                <span class="text-muted">{{index}} </span> 
                <span>\{{pron.pron}}\</span> 
                <i class="fa fa-volume-up" @click="playAudio(pron)" ></i>
            </span>
        </span>

    </div>

    <!-- GOOGLE TRANSLATE -->
    <div class="text-right">
        <a target="_blank" 
                :href="'https://translate.google.com.vn/m/translate?hl=vi#view=home&op=translate&sl=en&tl=vi&text=' + wordInfo.word " >
            <i class="fa fa-cloud" />  Google Translate
        </a>
        <br/>
        <!-- DICTIONARY CAMBIRGE -->
        <a target="_blank" 
                :href="'https://dictionary.cambridge.org/dictionary/english/' + wordInfo.word " >
            <i class="fa fa-book" />  Cambridge
        </a>
     <br/>
        <!-- DICTIONARY CAMBIRGE -->
        <a  v-scroll-to="'#_bookmark_' + wordInfo.word"  >
            <i class="fa fa-bookmark" />  Bookmark
        </a>
    </div>


    <!-- BODY INFO -->
    <b-tabs v-if="wordInfo.sense">
        <!-- TRAVERSE DICTIONARY TYPE -->
        <b-tab :title="religion"  v-bind:key="religion" v-for="(senses, religion) in wordInfo.sense">
            <!-- TRAVERSE WORD TYPE -->
            <b-list-group v-bind:key="wordType" v-for="(senseList, wordType) in senses" >
                <b-list-group-item variant="primary">{{wordType}}</b-list-group-item>
                <!-- TRAVERSE MEANNING WORD -->
                <b-list-group-item v-bind:key="index"  v-for="(sense, index) in senseList">
                    <i v-if="sense.marked" class="text-warning fa fa-star" />
                    <i v-if="!sense.marked" class="fa fa-star" @click="addBookmarkWord(religion, wordType, sense)"   />
                    
     
                    <strong v-if="sense.header != ''">{{sense.header}}</strong>
                    {{sense.content}}
                </b-list-group-item><!-- END TRAVERSE MEANNING WORD -->
            </b-list-group><!-- END TRAVERSE WORD  -->
        </b-tab><!-- END TRAVERSE DICTIONARY TYPE -->
    </b-tabs>


    
</div>
</template>

<script>
import {vokaApi} from 'api/index';
import {VokaHandler} from 'services/VokaHandler';

export default {
  name: 'VokaWordInfo',
  props: ['wordInfo'],
  data() {
    return {}
  },
  methods: {
      playAudio (pronounce) {
          VokaHandler.playPrononciation(pronounce);
      },
      addBookmarkWord (religion, wordType, sense) {
        sense.marked = true;
        let word = this.wordInfo.word;

        this.$emit('addBookmarkWord', { word, religion, wordType, sense })
      }, 
  },
}
</script>

<style scoped>
.word-pron-wrapper {
    font-size: 18px;
    margin-right: 12px;
}
.added {
 background-color: green;
}
</style>