<template>
  <div class="schedule">
    <div class="sections">
      <app-groups-select></app-groups-select>

      <div class="right">
        <app-schedule-list class="row"></app-schedule-list>
        <app-hours-list class="row"></app-hours-list>
      </div>
    </div>
  </div>
</template>

<script>
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
}
</script>

<style lang="less" scoped>
.schedule {
  max-height: 100%;
  overflow: auto;

  .sections {
    display: flex;
    justify-content: space-between;

    .right {
      display: grid;
      grid-template-rows: 2fr 1fr;
      grid-gap: 20px;

      width: 80%;
      margin-left: 20px;

      .row {
        border-radius: 5px;
      }
    }
  }

  .groups-select {
    width: 20%;
    background: var(--color-bg-dark);
    border-radius: 5px;
    padding: 10px;
  }
}
</style>
