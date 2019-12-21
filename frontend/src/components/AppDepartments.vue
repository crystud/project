<template>
  <div class="departments">
    <app-card class="header">Відділення</app-card>

    <app-card class="departments-list">
      <app-department-item
        v-for="(data) in list"
        v-bind:key="data.id"
        :id="data.id"
        :name="data.name"
        :leader="data.leader"
        :specialtysCount="data.specialtys.length"
      ></app-department-item>

      <app-add-department @onAdded="updateDepartments"></app-add-department>
    </app-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from './AppCard.vue'
import AppDepartmentItem from './AppDepartmentItem.vue'
import AppAddDepartment from './AppAddDepartment.vue'

export default {
  name: 'departments',
  components: {
    AppCard,
    AppDepartmentItem,
    AppAddDepartment,
  },
  computed: {
    ...mapGetters({
      list: 'departments/list',
    }),
  },
  methods: {
    ...mapActions({
      loadDepartments: 'departments/loadDepartments',
    }),
    updateDepartments() {
      this.loadDepartments()
    },
  },
  created() {
    this.loadDepartments()
  },
}
</script>

<style lang="less">
.departments {
  .app-card {
    margin-bottom: 10px;
    padding: 10px;
    color: #fff;
  }

  .header {
    display: inline-block;
    font-size: 1.3em;
  }

  .departments-list {
    display: grid;

    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 220px;
    grid-gap: 15px;
  }
}
</style>
