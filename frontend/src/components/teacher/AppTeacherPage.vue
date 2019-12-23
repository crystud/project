<template>
  <div class="teacher">
    <app-card class="header">Вчитель</app-card>

    <div class="sections">
      <app-teacher-personal-info
        :name="teacher.name"
        :commission="teacher.commission.name"
        :email="teacher.user.email"
        :department="teacher.department"
      ></app-teacher-personal-info>

      <app-teacher-classes-info></app-teacher-classes-info>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'

import AppTeacherClassesInfo from './AppTeacherClassesInfo.vue'
import AppTeacherPersonalInfo from './AppTeacherPersonalInfo.vue'

export default {
  name: 'AppTeacherPage',
  computed: {
    ...mapGetters({
      teacher: 'teachers/teacher',
    }),
  },
  methods: {
    ...mapActions({
      loadTeacher: 'teachers/loadTeacher',
    }),
  },
  components: {
    AppCard,
    AppTeacherPersonalInfo,
    AppTeacherClassesInfo,
  },
  created() {
    this.loadTeacher(this.$route.params.id).then(() => {
      console.log(this.teacher)
    })
  },
}
</script>

<style lang="less" scoped>
.teacher {
  max-height: 100%;
  overflow: auto;

  .header {
    color: #fff;
    padding: 10px;
  }

  .sections {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .classes-info {
      background: var(--color-bg-dark);
      border-radius: 4px;
    }

    .classes-info {
      width: calc(100% - 300px);
    }
  }
}
</style>
