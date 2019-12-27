<template>
  <div class="subjects">
    <div class="list">
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppSubjectsItem from './AppSubjectsItem.vue'
import AppSubjectsHeader from './AppSubjectsHeader.vue'
import AppSubjectsCreate from './AppSubjectsCreate.vue'

export default {
  name: 'AppSubjectsPage',
  components: {
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
