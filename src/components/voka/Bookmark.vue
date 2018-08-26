<template>
<div>
  <div>
    <strong> Total </strong>: {{bookmarkWords.length}} word(s)
  </div>
  <b-table class="text-left"  striped hover :items="bookmarkWords" :fields="bookmarkFields" >
      <template slot="index" slot-scope="data">
          {{data.index + 1}}
      </template>
      
      <template slot="word" slot-scope="data">
          <span :id="'_bookmark_' + data.item.word" class="text-primary" @click="quickSearch(data.item.word)">{{data.item.word}}</span> 
          <br/>

          <i class="fa fa-volume-up" @click="playAudio(data.item.word)" />
          <a class="fa fa-goole" target="_blank" 
                  :href="'https://translate.google.com.vn/m/translate?hl=vi#view=home&op=translate&sl=en&tl=vi&text=' + data.item.word " >
              <i class="fa fa-cloud" />
          </a>
      </template>

      <template slot="sense" slot-scope="row">
      <div :title="religion"  v-bind:key="religion" v-for="(senses, religion) in row.item.sense">
          <div v-for="(senseList, wordType) in senses" >
              <i class="fa fa-skull" /> <strong class="text-uppercase text-danger">{{wordType}}</strong>
              <!-- END TYPE -->
              <div v-for="(sense, index) in senseList" >
              <div >
                  <em  v-if="sense.header != ''" class="bg-primary text-lowercase" style="color: white; padding: 0px 3px 0px 6px; margin-right: 3px;"> {{sense.header}} </em>
                  
                  <i :id="popupId()" class="fa fa-angle-right" /> 
                  <span v-if="sense.note && sense.note != ''" class="text-success">[ {{sense.note}} ]</span>
                  {{sense.content}}
                  <!-- POPUP SETUP -->
                  <b-popover :target="lastPopupId()"  triggers="click focus">
                    <template slot="title">{{row.item.word}}</template>
                    <input v-model="sense.note" :data-popup="lastPopupId()" @keyup.enter="enterNote($event, row.item)" />
                  </b-popover>
                  <!-- END POPUP SETUP -->
              </div>
              </div>
              <!-- END TRAVERSE MEANNING WORD -->
          </div><!-- END TRAVERSE WORD  -->
      </div><!-- END TRAVERSE DICTIONARY TYPE -->
      </template>
  </b-table>

</div>
</template>


<script>
import _ from 'underscore';
import {vokaApi} from 'api/index';
import {VokaHandler} from 'services/VokaHandler';
import {VokaData} from 'services/VokaData';


let BOOKMARK_FIELDS = [
  // { key: 'index' },
  { key: 'word', sortable: true },
  { key: 'sense', sortable: false },
  { key: 'created_time', sortable: true},
];

var lastWordSensePopupId = null;

export default {
  name: 'Bookmark',
  data() {
    return {
        bookmarkFields: BOOKMARK_FIELDS,
        bookmarkWords: [],
    }
  },
  created: function () {
    let self = this;
    vokaApi.fetchBookmark().then(function(response){
        VokaData.setData(response.data);
        self.refreshData();
    })
  },
  methods: { 
      playAudio (word) {
        vokaApi.lookupWord(word).then(function(response){
          if(!_.has(response.data, 'pronounce')) {
            return;
          }
          var wordInfo = response.data;
          if(wordInfo.pronounce.us && wordInfo.pronounce.us.mp3 != '') {
            VokaHandler.playPrononciation(wordInfo.pronounce.us);
          } else if (wordInfo.pronounce.uk && wordInfo.pronounce.uk.mp3 != '') {
            VokaHandler.playPrononciation(wordInfo.pronounce.uk);
          }
        });
      },
      enterNote($event, item) {
        let popupID =  $event.target.getAttribute('data-popup'); // pure JS
        this.$root.$emit('bv::hide::popover', popupID); // hide 

        vokaApi.updateBookmark(item.word, item.sense)
        .then(function(resp){ console.log(resp) });
      },
      refreshData() {
        this.bookmarkWords = VokaData.getData();
      },
      quickSearch(word) {
        this.$emit('quickSearch', word)
      },
      popupId() {
        lastWordSensePopupId = _.uniqueId('word_sense');
        return lastWordSensePopupId;
      },
      lastPopupId(){
        return lastWordSensePopupId;
      }
  },
}
</script>