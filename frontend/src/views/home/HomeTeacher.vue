<template>
  <div class="home-student">
    <app-card class="header">Домівка вчителя</app-card>

    <app-card class="body">
      <app-schedule-list></app-schedule-list>
      <app-current-class></app-current-class>
    </app-card>
  </div>
</template>

<script>
import AppCard from '../../components/AppCard.vue'
import AppScheduleList from '../../components/home/teacher/AppScheduleList.vue'
import AppCurrentClass from '../../components/home/teacher/AppCurrentClass.vue'

export default {
  name: 'HomeStudent.vue',
  components: {
    AppCard,
    AppScheduleList,
    AppCurrentClass,
  },
}
</script>

<style lang="less" scoped>
.home-student {
  .app-card {
    padding: 20px;
    color: #fff;
  }

  .header {
    display: inline-block;
    margin-bottom: 10px;
  }

  .body {
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-gap: 20px;
  }
}
</style>
