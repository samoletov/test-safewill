<template>
  <div>
    {{ position + 1 }} <a v-bind:href="'/movie/' + item.id">{{ item.title }}</a>
  </div>
</template>

<script>
export default {
  name: 'MoviesListItem',
  props: ['item', 'position'],
};
</script>
