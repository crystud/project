<template>
  <div class="home-user">
    <app-card>А тут новини коледжу, типу завтра скорочені пари</app-card>
  </div>
</template>

<script>
import AppCard from '../../components/AppCard.vue'

export default {
  name: 'HomeTeacher',
  components: {
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.home-user {
  .app-card {
    padding: 20px;
    color: #fff;
  }
}
</style>
