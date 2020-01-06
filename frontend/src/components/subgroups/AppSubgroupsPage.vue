<template>
  <div class="subgroups">
    <div class="groups">
      <app-groups-select
        @change="(newGroupID) => groupID = newGroupID"
      ></app-groups-select>
    </div>

    <app-subgroup
      :groupID="groupID"
    ></app-subgroup>
  </div>
</template>

<script>
import AppGroupsSelect from '../schedule/AppGroupsSelect.vue'
import AppSubgroup from './AppSubgroup.vue'

export default {
  name: 'AppSubgroupsPage.vue',
  components: {
    AppGroupsSelect,
    AppSubgroup,
  },
  data() {
    return {
      groupID: 0,
    }
  },
}
</script>

<style lang="less" scoped>
.subgroups {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 15px;
  align-items: flex-start;
}
</style>
