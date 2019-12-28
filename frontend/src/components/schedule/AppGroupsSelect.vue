<template>
  <div class="groups-select">
    <div
      class="specialty"
      v-for="(data, index) in specialtys"
      v-bind:key="index">
      <div class="label">{{data.name}}</div>

      <div
        v-if="!data.groups.length"
        class="no-groups"
      >Груп в спеціальності немає...</div>

      <div class="groups">
        <div
          class="group"
          :class="selectedGroup === group.id ? 'selected' : ''"
          v-for="(group) in data.groups"
          v-bind:key="group.id"
          @click="selectGroup(group.id)"
        >{{group.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppGroupsSelect',
  computed: {
    ...mapGetters({
      specialtys: 'specialty/specialtysList',
    }),
  },
  data() {
    return {
      selectedGroup: null,
    }
  },
  methods: {
    ...mapActions({
      loadSpecialtysList: 'specialty/listSpecialtys',
    }),
    selectGroup(groupID) {
      this.$emit('change', groupID)

      this.selectedGroup = groupID
    },
  },
  created() {
    this.loadSpecialtysList()
  },
}
</script>

<style lang="less" scoped>
.groups-select {
  background: var(--color-bg-dark);
  border-radius: 5px;
  padding: 10px;

  .specialty {
    padding: 5px 0;
    border-bottom: 1px solid #2C3339;

    &:last-child {
      border: 0;
    }

    .label,
    .no-groups {
      color: var(--color-font-dark);
      display: block;
      margin-bottom: 5px;
    }

    .no-groups {
      color: #fff;
    }

    .groups {
      display: flex;
      flex-wrap: wrap;

      .group {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #3d3d3d;
        margin: 0 10px 10px 0;
        color: #fff;
        cursor: pointer;
        text-align: center;

        &.danger {
          border-color: #CF2323;
        }

        &.selected {
          border-color: #fff;
        }
      }
    }
  }
}
</style>
