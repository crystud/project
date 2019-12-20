<template>
  <div>
    <app-card>
      {{ $route.params }}
    </app-card>
  </div>
</template>

<script>
import AppCard from '../../components/AppCard.vue'

// import { mapGetters } from 'vuex'

export default {
  name: 'department',
  // computed: {
  //   ...mapGetters({
  //     department: 'department/',
  //   }),
  // },
  components: {
    AppCard,
  },
}
</script>

<style>
.app-card {
  padding: 10px;
  color: #fff;
}
</style>
