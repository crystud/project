<template>
  <div class="subjects">
    <app-card class="header">
      subjects
    </app-card>

    <app-card class="list">
      <app-subjects-header></app-subjects-header>
      <app-subjects-create></app-subjects-create>

      <app-subjects-item
        v-for="(data, index) in subjects"
        v-bind:key="index"
        :coefficient="data.subjectTypeData.coefficient"
        :name="data.name"
        :id="data.id"
        :commissionName="data.commission.name"
        :scoringSystemName="data.subjectTypeData.scoring_system.name"
        :subjectTypeName="data.subjectTypeData.name"
        :commissionID="data.commissionID"
        :subjectTypeID="data.subjectType"
      ></app-subjects-item>
    </app-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'
import AppSubjectsItem from './AppSubjectsItem.vue'
import AppSubjectsHeader from './AppSubjectsHeader.vue'
import AppSubjectsCreate from './AppSubjectsCreate.vue'

export default {
  name: 'AppSubjectsPage',
  components: {
    AppCard,
    AppSubjectsItem,
    AppSubjectsHeader,
    AppSubjectsCreate,
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
  max-height: 100%;
  overflow: auto;

  .header {
    display: inline-block;
    font-size: 1.3em;
    margin-bottom: 10px;
  }

  .app-card {
    padding: 10px;
    color: #fff;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
  }
}
</style>
