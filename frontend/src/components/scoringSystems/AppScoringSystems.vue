<template>
  <div class="subjects">
    <div class="list">
      <app-scoring-systems-header></app-scoring-systems-header>
      <app-scoring-system-create></app-scoring-system-create>

      <app-scoring-system-item
        v-for="(data, index) in list"
        v-bind:key="index"
        :scoringSystem="data"
      ></app-scoring-system-item>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppScoringSystemItem from './AppScoringSystemItem.vue'
import AppScoringSystemsHeader from './AppScoringSystemsHeader.vue'
import AppScoringSystemCreate from './AppScoringSystemCreate.vue'

export default {
  name: 'AppSubjectsPage',
  components: {
    AppScoringSystemItem,
    AppScoringSystemsHeader,
    AppScoringSystemCreate,
  },
  methods: {
    ...mapActions({
      load: 'scoringSystems/load',
    }),
  },
  computed: {
    ...mapGetters({
      list: 'scoringSystems/list',
    }),
  },
  created() {
    this.load()
  },
}
</script>

<style lang="less" scoped>
.subjects {
  padding: 10px;
  color: #fff;

  .header {
    display: inline-block;
    font-size: 1.3em;
    margin-bottom: 10px;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
  }
}
</style>
