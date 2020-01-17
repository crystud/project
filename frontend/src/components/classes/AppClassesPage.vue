<template>
  <div class="classes">
    <app-group-select
      class="group-select"
      @change="setGroup"
    ></app-group-select>

    <app-classes-list
      :groupID="groupID"
      class="app-classes-list"
    ></app-classes-list>
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
  grid-template-columns: 2fr 5fr;
  grid-gap: 20px;

  @media screen and (max-width: 1450px) {
    display: block;

    .app-classes-list {
      margin-top: 20px;
    }
  }
}
</style>
