<template>
  <div id="app">
    <router-view class="view" foo="123"></router-view>
  </div>
</template>

<script>
import MoviesList from './components/MoviesList.vue';
import Movie from './components/Movie.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: MoviesList },
    { path: '/movie/:id', component: Movie, props: true },
  ],
});

export default {
  name: 'App',
  router,

  //  render (h) { return h(this.ViewComponent) }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
