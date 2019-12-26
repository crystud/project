<template>
  <div class="semesters">
    <app-specialty-select
      @onSet="setSemester"
    ></app-specialty-select>

    <app-semesters
      :semesters="semesters"
      :specialtyID="specialtyID"
      :specialtyName="specialtyName"
    ></app-semesters>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppSpecialtySelect from './AppSpecialtySelect.vue'
import AppSemesters from './AppSemesters.vue'

export default {
  name: 'AppSemestersPage',
  components: {
    AppSpecialtySelect,
    AppSemesters,
  },
  computed: {
    ...mapGetters({
      semesters: 'semesters/list',
    }),
  },
  data() {
    return {
      specialtyID: 0,
      specialtyName: '',
    }
  },
  methods: {
    ...mapActions({
      loadSemesters: 'semesters/loadSemesters',
    }),
    setSemester({ specialtyID, name }) {
      this.specialtyID = specialtyID
      this.specialtyName = name

      this.loadSemesters(specialtyID)
    },
  },
}
</script>

<style lang="less" scoped>
.semesters {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
}

@media screen and (max-width: 1500px) {
  .semesters {
    grid-template-columns: 1fr;
  }
}
</style>
