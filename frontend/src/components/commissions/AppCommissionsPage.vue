<template>
  <div class="commissions">
    <app-card class="header">
      Комісії
    </app-card>

    <app-card class="list">
      <app-commissions-header></app-commissions-header>
      <app-commissions-create></app-commissions-create>

      <app-commissions-item
        v-for="({ id, name, teachers }, index) in commissions"
        v-bind:key="index"
        :name="name"
        :id="id"
        :teachersCount="teachers.length"
      ></app-commissions-item>
    </app-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'
import AppCommissionsItem from './AppCommissionsItem.vue'
import AppCommissionsHeader from './AppCommissionsHeader.vue'
import AppCommissionsCreate from './AppCommissionsCreate.vue'

export default {
  name: 'AppSubjectsPage',
  components: {
    AppCard,
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
  max-height: 100%;
  overflow: auto;

  .header {
    display: inline-block;
    font-size: 1.3em;
    margin-bottom: 10px;
  }

  .app-card {
    padding: 10px;
    color: #fff;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
  }
}
</style>
