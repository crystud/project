<template>
  <div class="list">
    <app-topic
      v-for="i in 15"
      v-bind:key="i"
    ></app-topic>
  </div>
</template>

<script>
import AppTopic from './AppTopic.vue'

export default {
  name: 'AppTopicsList.vue',
  components: {
    AppTopic,
  },
}
</script>

<style lang="less" scoped>
.list {
  padding: 20px;
  border-radius: 8px;
  background: var(--color-bg-dark);
  color: #fff;
}
</style>
