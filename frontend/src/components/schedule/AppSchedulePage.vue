<template>
  <div class="schedule">
    <div class="sections">
      <app-groups-select
        @change="groupChange"
      ></app-groups-select>

      <div class="right" v-if="groupID">
        <app-schedule-list class="row"></app-schedule-list>
      </div>
    </div>

    <app-schedule-editing
      :groupID="groupID"
      @edited="update"
    ></app-schedule-editing>

    <app-schedule-create
      @created="update"
    ></app-schedule-create>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppGroupsSelect from './AppGroupsSelect.vue'
import AppScheduleList from './AppScheduleList.vue'
import AppScheduleEditing from './AppScheduleEditing.vue'
import AppScheduleCreate from './AppScheduleCreate.vue'

export default {
  name: 'AppSchedulePage',
  components: {
    AppGroupsSelect,
    AppScheduleList,
    AppScheduleEditing,
    AppScheduleCreate,
  },
  computed: {
    ...mapGetters({
      group: 'group/group',
      isEditing: 'schedule/isEditing',
      editingItem: 'schedule/editing',
    }),
  },
  data() {
    return {
      groupID: 0,
    }
  },
  methods: {
    ...mapActions({
      loadGroup: 'group/get',
    }),
    update() {
      this.loadGroup(this.groupID)
    },
    groupChange(groupID) {
      this.loadGroup(groupID)
      this.groupID = groupID
    },
  },
}
</script>

<style lang="less" scoped>
.schedule {
  .sections {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;

    @media screen and (max-width: 1400px) {
      grid-template-columns: 1fr;
    }

    .right {
      .row {
        border-radius: 5px;
      }
    }
  }
}
</style>
