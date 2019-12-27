<template>
  <div class="commissions">

    <div class="list">
      <app-commissions-header></app-commissions-header>
      <app-commissions-create></app-commissions-create>

      <app-commissions-item
        v-for="({ id, name, teachers }, index) in commissions"
        v-bind:key="index"
        :name="name"
        :id="id"
        :teachersCount="teachers.length"
      ></app-commissions-item>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCommissionsItem from './AppCommissionsItem.vue'
import AppCommissionsHeader from './AppCommissionsHeader.vue'
import AppCommissionsCreate from './AppCommissionsCreate.vue'

export default {
  name: 'AppSubjectsPage',
  components: {
    AppCommissionsItem,
    AppCommissionsHeader,
    AppCommissionsCreate,
  },
  methods: {
    ...mapActions({
      loadCommissions: 'commissions/loadCommissions',
    }),
  },
  computed: {
    ...mapGetters({
      commissions: 'commissions/list',
    }),
  },
  created() {
    this.loadCommissions()
  },
}
</script>

<style lang="less" scoped>
.commissions {
  color: #fff;

  .list {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
  }
}
</style>
