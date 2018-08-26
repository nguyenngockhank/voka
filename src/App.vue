<template>
  <div id="app">
    <MyNavBar />
    <router-view/>
  </div>
</template>

<script>
import MyNavBar from './components/NavBar'
export default {
  components: { MyNavBar },
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
