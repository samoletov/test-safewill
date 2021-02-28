<template>
  <ol>
    <h1>Top10</h1>

    <input v-model="filter" placeholder="filter title" v-on:keyup="keyup" />

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="items" class="content">
      <MoviesListItem
        v-for="(item, index) in items"
        v-bind:position="index"
        v-bind:item="item"
        v-bind:key="item.id"
        v-bind:filter="loadedFilter"
      ></MoviesListItem>
    </div>
  </ol>
</template>

<script>
import { getList, getSearch } from '../api';
import MoviesListItem from './MoviesListItem.vue';

var timeout = null;
export default {
  name: 'MoviesList',
  components: {
    MoviesListItem,
  },
  data: () => {
    return {
      loading: false,
      items: null,
      error: null,
      filter: null,
      loadFilter: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async keyup() {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        if (this.filter !== this.loadedFilter) {
          await this.fetchData(this.filter);
        }
      }, 300);
    },
    async fetchData(filter = null) {
      this.error = this.post = null;
      this.loading = true;
      try {
        const { data } = filter ? await getSearch(this.filter) : await getList();
        this.loadedFilter = filter;
        this.loading = false;
        this.items = data;
      } catch (err) {
        this.loading = false;
        this.error = err.toString();
      }
    },
  },
};
</script>
