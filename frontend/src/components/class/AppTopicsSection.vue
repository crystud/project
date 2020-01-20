<template>
  <div class="topics">
    <app-topics-list></app-topics-list>
    <app-create-topic></app-create-topic>
  </div>
</template>

<script>
import AppTopicsList from './AppTopicsList.vue'
import AppCreateTopic from './AppCreateTopic.vue'

export default {
  name: 'AppTopicsSection.vue',
  components: {
    AppTopicsList,
    AppCreateTopic,
  },
}
</script>

<style>
.topics {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 20px;
  margin-top: 20px;
  align-items: flex-start;
}
</style>
