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

<style lang="less">
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

  .groups-select {
    background: var(--color-bg-dark);
    border-radius: 5px;
    padding: 10px;
  }
}
</style>
