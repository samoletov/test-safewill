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
    </div>
  </div>
</template>

<script>
import { getItem } from '../api';

export default {
  name: 'Movie',
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
      const id = this.$route.params.id;
      try {
        const { data } = await getItem(id);
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
