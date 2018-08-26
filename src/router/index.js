import Vue from 'vue'
import Router from 'vue-router'

import GameVoka from '../components/game/Voka'
// import CheckVoka from '../components/check/App'
import Learn from '../components/voka/Main'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Learn',
            component: Learn
        },
        {
            path: '/game',
            name: 'GameVoka',
            component: GameVoka
        },
        // {
        //     path: '/check',
        //     name: 'CheckVoka',
        //     component: CheckVoka
        // },
        
    ]
})
