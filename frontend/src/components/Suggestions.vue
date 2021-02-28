<template>
  <ol>
    <h1>Recommended movies</h1>

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="items" class="content">
      <Suggestion v-for="item in items" v-bind:item="item" v-bind:key="item.id"></Suggestion>
    </div>
  </ol>
</template>

<script>
import { getSuggestions } from '../api';
import Suggestion from './Suggestion.vue';
export default {
  name: 'Suggestions',
  components: {
    Suggestion,
  },
  props: ['slug'],
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
      const slug = this.$props.slug;
      try {
        const { data } = await getSuggestions(slug);
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
