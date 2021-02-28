<template>
  <div>
    {{ !filter ? position + 1 : '' }} <a v-bind:href="'/movie/' + item.slug">{{ item.title }}</a>
  </div>
</template>

<script>
export default {
  name: 'MoviesListItem',
  props: ['item', 'position', 'filter'],
};
</script>
