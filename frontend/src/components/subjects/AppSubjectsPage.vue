<template>
  <div class="subjects">
    <app-card class="header">
      subjects
    </app-card>

    <app-card>
      {{subjects}}
    </app-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'

export default {
  name: 'AppSubjectsPage',
  components: {
    AppCard,
  },
  methods: {
    ...mapActions({
      loadSubjects: 'subjects/load',
    }),
  },
  computed: {
    ...mapGetters({
      subjects: 'subjects/subjects',
    }),
  },
  created() {
    this.loadSubjects()
  },
}
</script>

<style lang="less" scoped>
.subjects {
  .header {
    display: inline-block;
    font-size: 1.3em;
    margin-bottom: 10px;
  }

  .app-card {
    padding: 10px;
    color: #fff;
  }
}
</style>
