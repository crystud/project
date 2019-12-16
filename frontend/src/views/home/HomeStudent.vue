<template>
<div class="home-student">
  <app-card>Уявімо, що тут інформація про теперішній урок і тд.</app-card>
</div>
</template>

<script>
import AppCard from '../../components/AppCard.vue'

export default {
  name: 'HomeStudent',
  components: {
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.home-student {
  .app-card {
    padding: 20px;
    color: #fff;
  }
}
</style>
