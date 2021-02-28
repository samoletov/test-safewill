<template>
  <div class="post">
    <a href="/">back</a>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="item" class="content">
      <h2>{{ item.title }}</h2>
      <h3>Rating: {{ item.rating }}</h3>
      <h4>{{ item.description }}</h4>
      <img v-bind:src="item.logoUrl" />
      <Suggestions v-bind:slug="item.slug" />
    </div>
  </div>
</template>

<script>
import { getItem } from '../api';
import Suggestions from './Suggestions.vue';

export default {
  name: 'Movie',
  components: {
    Suggestions,
  },
  data: () => {
    return {
      loading: false,
      item: null,
      error: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.error = this.post = null;
      this.loading = true;
      const slug = this.$route.params.slug;
      try {
        const { data } = await getItem(slug);
        this.loading = false;
        this.item = data;
      } catch (err) {
        this.loading = false;
        this.error = err.toString();
      }
    },
  },
};
</script>
