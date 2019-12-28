<template>
  <div class="schedule">
    <div class="sections">
      <app-groups-select
        @change="groupChange"
      ></app-groups-select>

      <div class="right">
        <app-schedule-list class="row"></app-schedule-list>
        <app-hours-list class="row"></app-hours-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppGroupsSelect from './AppGroupsSelect.vue'
import AppHoursList from './AppHoursList.vue'
import AppScheduleList from './AppScheduleList.vue'

export default {
  name: 'AppSchedulePage',
  components: {
    AppGroupsSelect,
    AppScheduleList,
    AppHoursList,
  },
  computed: {
    ...mapGetters({
      group: 'group/group',
    }),
  },
  methods: {
    ...mapActions({
      loadGroup: 'group/get',
    }),
    groupChange(groupID) {
      this.loadGroup(groupID)
    },
  },
}
</script>

<style lang="less" scoped>
.schedule {
  .sections {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 20px;

    @media screen and (max-width: 1400px) {
      grid-template-columns: 1fr;
    }

    .right {
      display: grid;
      grid-template-rows: 2fr 1fr;
      grid-gap: 20px;

      .row {
        border-radius: 5px;
      }
    }
  }
}
</style>
