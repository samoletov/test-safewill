<template>
  <ol>
    <h1>Top10</h1>

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="items" class="content">
      <input v-model="filter" placeholder="filter title" />
      <MoviesListItem
        v-for="(item, index) in filteredTitle"
        v-bind:position="index"
        v-bind:item="item"
        v-bind:key="item.id"
      ></MoviesListItem>
    </div>
  </ol>
</template>

<script>
import { getList } from '../api';
import MoviesListItem from './MoviesListItem.vue';
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
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.error = this.post = null;
      this.loading = true;
      try {
        const { data } = await getList();
        this.loading = false;
        this.items = data;
      } catch (err) {
        this.loading = false;
        this.error = err.toString();
      }
    },
  },
  computed: {
    filteredTitle() {
      if (this.filter) {
        return this.items.filter((item) => {
          return item.title.toLowerCase().match(this.filter.toLowerCase());
        });
      } else {
        return this.items;
      }
    },
  },
};
</script>
