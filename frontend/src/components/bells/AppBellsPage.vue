<template>
  <div class="bells">
    <app-card>Розклад дзвінків</app-card>

    <app-bells-list
      title="Графік повних пар"
      :bells="fulltime"
      type="fulltime"
      :hoursList="[
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
      ]"
    ></app-bells-list>

    <app-bells-list
      title="Графік скорочених пар"
      :bells="parttime"
      type="pertime"
      :hoursList="[
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
      ]"
    ></app-bells-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppCard from '../AppCard.vue'
import AppBellsList from './AppBellsList.vue'

export default {
  name: 'AppBellsPage.vue',
  components: {
    AppCard,
    AppBellsList,
  },
  computed: {
    ...mapGetters({
      fulltime: 'timetables/fulltime',
      parttime: 'timetables/parttime',
    }),
  },
  data() {
    return {
      fulltimeCalculated: [],
    }
  },
  methods: {
    ...mapActions({
      fetchTimetables: 'timetables/fetch',
    }),
  },
  created() {
    this.fetchTimetables()
  },
}
</script>

<style lang="less" scoped>
.bells {
  .app-card {
    display: inline-block;
    padding: 10px;
    color: #fff;
  }
}
</style>
