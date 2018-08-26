<template>
  <div class="word-item" :class="{'word-item-active': word.highlight}" 
        @click="word.highlight = !word.highlight" >

    <div class="word-item-title">
        <span class="word-content">{{word.word}}</span>
        {{word.type}}     
        <a class="word-sound" v-bind:href="'https://translate.google.com/#en/vi/'+ word.word" target="_blank"><i class="fas fa-volume-up"></i></a>
    </div>

    <div class="word-spelling">
        <em>{{word.spelling}}</em>
    </div>

    <b-row>
        <b-col cols="8">
            <span v-show="word.showMeaning">{{word.meaning}}</span>
        </b-col>
        
        <b-col cols="4">
            <div class="btn-group text-right">

                <button v-show="known" class="btn btn-default btn-sm"  @click.stop="ignoreWord(word)">  
                    X
                </button>

                <button v-show="!known" class="btn btn-default btn-sm"  @click.stop="knowWord(word)">  
                    <i class="fa fa-check word-item-check" /> 
                </button>


                <button class="btn btn-default btn-sm"  @click.stop="word.showMeaning = !word.showMeaning">
                    <i class="fa" :class="{'fa-eye': !word.showMeaning, 'fa-eye-slash': word.showMeaning }" />
                </button>
            </div>
        </b-col>
    </b-row>

    <i class="fa fa-close word-item-close" 
            @click.stop="ignoreWord(word)" />

    <div class="clearfix"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { IGNORE_WORD, KNOW_WORD} from "../../store/constants";


export default {
    name: 'WordItem',
    props: ['word', 'known'],
    data () {
        return {}
    },
    methods: {
        ...mapActions([
            IGNORE_WORD, KNOW_WORD, 
        ]),
    },  
    computed: {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.word-item{
    border: 1px solid #ddd;
    padding: 7px 7px 6px;
    position: relative;
}
.word-item-active {
    border: 1px solid #17b86e;
}
.word-item-close {
    position: absolute;
    right: 3px;
    top: 3px;
    color: #afafaf; 
}
.word-item-check {
}

.word-sound {
    color: black;
}
.word-item-title {
    margin-bottom: 3px;
}
.word-spelling {
    margin-bottom: 4px;
}
.word-content {
    font-size: 18px;
    font-weight: bold;
}
</style>
