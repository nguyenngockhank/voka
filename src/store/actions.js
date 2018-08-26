import * as constants from "./constants";
import _ from 'underscore';

var actions = {}
_.each(constants, function(attr){
    actions[attr] = function({ commit }, ...restArgs){
      let params = [attr, ...restArgs];  
      commit.apply(null, params);
    }
})


// actions[constants.VOKA_BOOKMARK_INSERT] = function({commit}, )

export default actions;
