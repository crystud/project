<template>
<app-screen>
  <div class="header">
    Щоб вийти почисти local storage
  </div>

  <router-view class="content"></router-view>
</app-screen>
</template>

<script>
import AppScreen from '../components/AppScreen.vue'

export default {
  name: 'Home.vue',
  components: {
    AppScreen,
  },
}
</script>

<style lang="less" scoped>
.app-screen {
  display: grid;

  grid-template-rows: 1fr;
  grid-template-columns: 360px 1fr;
  grid-template-areas: 'name .';

  .header {
    grid-area: name;
    background: var(--color-bg-dark);
  }

  .content {

  }
}
</style>
