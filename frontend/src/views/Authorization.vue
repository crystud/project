<template>
  <app-screen>
    <app-card>
      <router-view></router-view>
    </app-card>
  </app-screen>
</template>

<script>
import AppScreen from '../components/AppScreen.vue'
import AppCard from '../components/AppCard.vue'

export default {
  name: 'Hom.vue',
  components: {
    AppScreen,
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.app-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg-dark);

  .app-card {
    background: var(--color-bg-main);
    padding: 45px;
    min-height: 500px;
    width: 620px;
    text-align: center;
  }
}
</style>
