<template>
  <div class="classes-list">
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

</style>
