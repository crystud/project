<template>
  <div class="classes-list">
    <div
      v-if="!groupID"
      class="no-group-selected"
    >Оберіть групу...</div>

    <div v-if="groupID">
      <app-classes-create
        :groupID="groupID"
      ></app-classes-create>

      <app-classes-item
        v-for="(classData, index) in groupSubjects"
        v-bind:key="index"
        :data="classData"
        :groupID="groupID"
      ></app-classes-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppClassesItem from './AppClassesItem.vue'
import AppClassesCreate from './AppClassesCreate.vue'

export default {
  name: 'AppClassesList',
  components: {
    AppClassesItem,
    AppClassesCreate,
  },
  computed: {
    ...mapGetters({
      groupSubjects: 'group/subjects',
    }),
  },
  props: {
    groupID: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style>
.no-group-selected {
  font-size: 1.2em;
  text-align: center;
  margin: 30px 0;
  color: #fff;
}
</style>
