<template>

<b-navbar toggleable="md" type="dark" variant="dark">
<b-container>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">  <i class="fa fa-burn" /> Game</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
        <div v-for="(item, index) in items">
            <!-- CASE HAS SUB ITEMS -->
            <b-nav-item-dropdown v-if="!!item.items && item.items.length > 0" :text="item.text">
                <b-dropdown-item v-for="(subitem) in item.items" 
                                v-bind:data="subitem"
                                v-bind:key="subitem.text"
                                :href="subitem.href" >
                    {{subitem.text}}
                </b-dropdown-item> 
            </b-nav-item-dropdown>
            <!-- CASE HAS NO SUB ITEMS -->
            <b-nav-item v-else :href="item.href">{{item.text}}</b-nav-item>
        </div>
    </b-navbar-nav>

    </b-collapse>
    
</b-container>
</b-navbar>
</template>

<script>
export default {
    name: 'MyNavBar',
    data () {
        return {
            items:[
                {
                    text: 'Learn',
                    href: "#/",
                },
                {
                    text: 'Game',
                    href: "#/game",
                },
                // {   
                //     text: 'Generate', 
                //     items: [
                //        { href: '#/generate/eloquent', text: 'Eloquent', }, 
                //        { href: '#/generate/model', text: 'Model' }, 
                //     ]
                // }, 
                {
                    text: "Check",
                    href: "#/check",
                }
            ]
        }
    } 
}
</script>