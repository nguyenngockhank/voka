<template>
  <div class="game-container">
    <b-container class="text-left" >
    <b-row>
        <b-col cols="4" class="text-center">
            <h2 ><i class="fa fa-grin-stars" />  Vokabulary</h2>
            <div>
                <label for="inp" class="inp">
                    <input v-model="input" ref="wordInput" 
                        @keyup.enter="checkWord" :disabled="!running"  />
                </label>
            </div>
            <div style="margin: 20px;" >
                <p>
                    Input vocabularies as much as posible in {{minTimeout}} minutes.
                </p>
            </div>
        </b-col>

        <b-col cols="2">
            <div class="text-center">
                <h2><i class="fa fa-clock" /> Time</h2>
                <countdown v-if="running" :time="timeout"
                         @countdownend="countdownEnd" >
                    <template slot-scope="props">
                        {{ props.minutes }} : {{ props.seconds }}
                    </template>
                </countdown>
                <div v-if="!running" >
                    <input v-model="minTimeout" placeholder="minutes" type="number" />
                    <br /><br />
                    <b-button size="sm" variant="primary" @click="startInput" >
                        Start
                    </b-button>
                </div>
            </div>
        </b-col>

        <b-col cols="6">
            <b-table striped hover :items="words" :fields="wordFields" caption-top>
                <template slot="table-caption"> <i class="fa fa-star" /> 
                    <strong> Correct Words ({{words.length}} / {{enterTimes}}) </strong>
                </template>

                <template slot="index" slot-scope="data">
                    {{data.index + 1}}
                </template>
                <template slot="detail" slot-scope="row">

                    <span :id="'word-'+ row.item.idx"><i class="fa fa-file-code" /> </span>

                    <b-popover :target="'word-' + row.item.idx" triggers="hover" placement="right" ref="popover">
                        <div v-html="row.item.detail" />
                    </b-popover>
            
                </template>
            </b-table>
        </b-col>

    </b-row>
    </b-container>
  </div>
</template>

<script>
import _ from 'underscore';
import {lookupWord} from '../../api/index';

const WORD_FIELDS = ['index', 'word', 'detail'];
// const TIMEOUT =  1000 * 60 * 5; // 5 mins

export default {
  name: 'GameVoka',
  data() {
    return {
        input: '',
        minTimeout: 5,
        timeout:  1000 * 60 * 5,
        wordFields: WORD_FIELDS,
        words: [],
        counting: false,
        running: false,
        enterTimes: 0,
    }
  },
  methods: {
      startInput() {
        this.running = true;
        this.timeout =  1000 * 60 * this.minTimeout;
        this.words = [];        
        this.enterTimes = 0;
        let self = this;
        setTimeout(function(){
            self.$refs.wordInput.focus();
        }, 500);
      },
      countdownEnd (){
        this.running = false;
        this.timeout = TIMEOUT;
      },
      checkWord () {
        ++this.enterTimes;
        let inputWord = this.input.trim();
        this.input = ''; // reset
        if(inputWord == '') {
            return;
        }
        let self = this;

        let wordFound = _.find(this.words, function(word){
            if(word.word.toLowerCase() === inputWord.toLowerCase()) {
                return true;
            }
        });

        if(_.isObject(wordFound)) {
            return;
        }
        
        lookupWord(inputWord).then(function(response){
            let serverWord = response.data;
            if(!_.isEmpty(serverWord)) {
                // console.log(serverWord)
                self.words.unshift(serverWord);
            } 
        })
      }
  },
}
</script>

<style scoped>
.game-container {
    margin-top: 10px;
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
