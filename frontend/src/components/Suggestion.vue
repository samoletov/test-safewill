<template>
  <div>
    <a v-bind:href="'/movie/' + item.slug">{{ item.title }}</a>
  </div>
</template>

<script>
export default {
  name: 'Suggestion',
  props: ['item'],
};
</script>
