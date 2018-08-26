<template>
  <section class="container">
    <header>
      <h1>Vocabulary Checklist</h1>
       Total: <em class="switch-mode" @click="switchMode('CHECK_KNOWN')">{{totalWords}}</em> words. 
       You know: <em class="switch-mode" @click="switchMode('VIEW_KNOWN')" >{{totalKnownWords}}</em> words. 
       You didn't know: <em class="switch-mode" @click="switchMode('VIEW_IGNORE')" >{{totalIgnoredWords}}</em> words. 
       Processed: <em>{{totalProcessedWords}} </em> words.
    </header>

    <section v-show="mode === 'CHECK_KNOWN'">
      <b-row >
        <b-col cols="4" v-bind:key="index" v-for="(word, index) in words">
          <WordItem :key="index" :word="word" :known="false" />
        </b-col>
      </b-row >
    </section>

    <section v-show="mode === 'VIEW_KNOWN'">
      <b-row >
        <b-col cols="4" v-bind:key="index" v-for="(word, index) in knownWords">
        <WordItem :key="index" :word="word" :known="true" />
        </b-col>
      </b-row >
    </section>

    <section v-show="mode === 'VIEW_IGNORE'">
      <b-row >
        <b-col cols="4" v-bind:key="index" v-for="(word, index) in knownWords">
          <WordItem :key="index" :word="word" :known="false" />
        </b-col>
      </b-row >
    </section>

  </section>
</template>

<script>
import { mapActions } from 'vuex'
import WordItem from './WordItem.vue'
import { KNOW_WORD_LIST, IGNORE_WORD_LIST, RETRIVE_KNOW_WORDS } from "../../store/constants";

export default {
  components: {  WordItem },
  created: function () {
    var self = this;
    window.addEventListener('keydown', function(e){
      // e.preventDefault();
      if(e.which === 89) { /// y, Y
        self[KNOW_WORD_LIST](); 
      } else if (e.which === 78 ) { // n, N
        self[IGNORE_WORD_LIST](); 
      }
    })
  },
  data () {
    return {
      mode: 'CHECK_KNOWN', // CHECK_KNOWN, VIEW_KNOWN, VIEW_IGNORE
      totalWords: this.$store.state.totalWords
    }
  },
  computed: {
    words(){
      return this.$store.state.words;
    },
    knownWords(){
      return this.$store.state.knownWords;
    },
    totalKnownWords(){
      return this.$store.state.numKnownWords;
    },
    totalIgnoredWords(){
      return this.$store.state.numIgnoredWords;
    },
    totalProcessedWords(){
      return this.$store.state.numProcessedWords;
    },
  },
  methods: { 
     ...mapActions([
       KNOW_WORD_LIST, IGNORE_WORD_LIST, RETRIVE_KNOW_WORDS
    ]),
    switchMode(mode) {
      if(this.mode === mode) {
        return;
      }

      switch(mode) {
        case 'VIEW_KNOWN':
        case 'VIEW_IGNORE':
          this[RETRIVE_KNOW_WORDS](mode);
          break;
      }
      this.mode = mode;
      console.log(this.mode)
    }
  },
}
</script>

<style scoped>
.switch-mode{
  color: red;
  text-decoration: underline;
}
</style>
