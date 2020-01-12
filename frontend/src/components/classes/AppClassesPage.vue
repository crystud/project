<template>
  <div class="classes">
    <app-group-select
      class="group-select"
      @change="setGroup"
    ></app-group-select>

    <app-classes-list :groupID="groupID"></app-classes-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppGroupSelect from '../schedule/AppGroupsSelect.vue'
import AppClassesList from './AppClassesList.vue'

export default {
  name: 'AppClassesPage',
  components: {
    AppGroupSelect,
    AppClassesList,
  },
  data() {
    return {
      groupID: 0,
    }
  },
  methods: {
    ...mapActions({
      loadGroupSubjects: 'group/loadGroupSubjects',
      loadTeachers: 'teachers/loadAllTeachers',
      loadSubgroups: 'group/loadSubgroups',
      loadGroupAvailableSubjects: 'group/loadGroupAvailableSubjects',
    }),
    setGroup(groupID) {
      this.groupID = groupID

      this.loadGroupSubjects(groupID)

      this.loadTeachers()
      this.loadSubgroups(groupID)
      this.loadGroupAvailableSubjects(groupID)
    },
  },
}
</script>

<style lang="less" scoped>
.classes {
  display: grid;
  grid-template-columns: 20% 80%;
  grid-gap: 20px;

  @media screen and (max-width: 1450px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
    grid-template-rows: 100px auto;
  }
}
</style>
